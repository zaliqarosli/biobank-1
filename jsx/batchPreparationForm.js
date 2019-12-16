// import {PureComponent} from 'react';
import SpecimenProcessForm from './processForm';
import Modal from 'Modal';
import Loader from 'Loader';

/**
 * Biobank BatchPreparation Specimen Form
 *
 * TODO: DESCRIPTION
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 **/

const defaultState = {
  preparation: {},
  list: {},
  count: 0,
  current: {},
  loading: false,
};

class BatchPreparationForm extends React.PureComponent {
  constructor() {
    super();

    this.state = defaultState;
    this.setCurrent = this.setCurrent.bind(this);
    this.setPreparation = this.setPreparation.bind(this);
    this.setPreparationList = this.setPreparationList.bind(this);
    this.setPool = this.setPool.bind(this);
  };

  clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  setCurrent(name, value) {
    return new Promise((resolve) => {
      const current = this.clone(this.state.current);
      current[name] = value;
      this.setState({current}, resolve());
    });
  }

  setPreparation(name, value) {
    return new Promise((resolve) => {
      const preparation = this.clone(this.state.preparation);
      preparation[name] = value;
      this.setState({preparation}, resolve());
    });
  }

  setPreparationList(containerId) {
    const list = this.clone(this.state.list);
    const current = this.clone(this.state.current);
    const preparation = this.clone(this.state.preparation);
    const container = this.props.data.containers[containerId];
    const specimen = Object.values(this.props.data.specimens)
      .find((specimen) => specimen.containerId == containerId);

    const count = this.state.count+1;

    // Use setListItem here instead.
    list[count] = {specimen, container};

    current.typeId = specimen.typeId;
    current.centerId = container.centerId;

    preparation.centerId = container.centerId;

    this.setState({preparation, list, current, count});
  }

  setPool(name, poolId) {
    const pool = this.clone(this.props.data.pools[poolId]);

    this.setCurrent('loading', true)
    .then(() => this.setCurrent(name, poolId))
    .then(() => Promise.all(pool.specimenIds
      .map((specimenId) => Object.values(this.state.list)
        .find((item) => item.specimen.id === specimenId)
        || this.setPreparationList(this.props.data.specimens[specimenId].containerId))
      .map((p) => p instanceof Promise ? p : Promise.resolve(p))))
    .then(() => this.setCurrent(name, null))
    .then(() => this.setCurrent('loading', false));
  }

  removeListItem(key) {
    const list = this.clone(this.state.list);
    delete list[key];
    const current = Object.keys(list).length === 0 ? {} : this.clone(this.state.current);
    this.setState({list, current});
  }

  render() {
    if (this.state.current.loading) {
      return <Loader/>;
    }

    const {data, errors, options, mapFormOptions} = this.props;
    const {preparation, list, current} = this.state;

    const preparationForm = (
      <SpecimenProcessForm
        edit={true}
        errors={errors.preparation}
        mapFormOptions={mapFormOptions}
        options={options}
        process={preparation}
        processStage='preparation'
        setParent={this.setPreparation}
        setCurrent={this.setCurrent}
        typeId={current.typeId}
      />
    );

    // TODO: This should likely be filtered so that only pools that match the
    // proper criteria are left in the list.
    const pools = mapFormOptions(data.pools, 'label');
    const glyphStyle = {
      color: '#DDDDDD',
      marginLeft: 10,
      cursor: 'pointer',
    };

    const barcodeList = Object.entries(list)
      .map(([key, item]) => {
        const handleRemoveItem = () => this.removeListItem(key);
        return (
          <div key={key} className='preparation-item'>
            <div>{item.container.barcode}</div>
            <div
              className='glyphicon glyphicon-remove'
              style={glyphStyle}
              onClick={handleRemoveItem}
            />
          </div>
        );
      });

    const form = (
      <FormElement>
        <div className='row'>
          <div className='col-sm-10 col-sm-offset-1'>
            <StaticElement
              label='Preparation Note'
              text="Select or Scan the specimens to be prepared. Specimens must
                    have a Status of 'Available', have a Quantity of greater
                    than 0, and share the same Type. Any previous Preparation
                    associated with a Pooled Specimen will be overwritten if one
                    is added on this form."
            />
            <StaticElement
              label='Specimen Type'
              text={(options.specimen.types[current.typeId]||{}).label || '—'}
            />
            <StaticElement
              label='Site'
              text={options.centers[current.centerId] || '—'}
            />
            <div className='row'>
              <div className='col-xs-6'>
                <h4>Barcode Input</h4>
                <div className='form-top'/>
                {/*
                  * This takes to long to load upon input. It should only be put
                  * back upon request, and once it is fixed up and optimized.
                <BarcodeInput
                  data={data}
                  options={options}
                  current={current}
                  list={list}
                  setPreparationList={this.setPreparationList}
                />
                */}
                <SearchableDropdown
                  name={'poolId'}
                  label={'Pool'}
                  onUserInput={(name, value) => value && this.setPool(name, value)}
                  options={pools}
                  value={current.poolId}
                />
              </div>
              <div className='col-xs-6'>
                <h4>Barcode List</h4>
                <div className='form-top'/>
                <div className='preparation-list'>
                  {barcodeList}
                  {current.loading && <Loader/>}
                </div>
              </div>
            </div>
            <div className='form-top'/>
            {preparationForm}
          </div>
        </div>
      </FormElement>
    );

    const handleClose = () => {
      this.setState(defaultState);
      this.props.onClose();
    };
    const handleSubmit = () => this.props.onSubmit(preparation, list);
    return (
      <Modal
        title='Prepare Specimens'
        show={this.props.show}
        onClose={handleClose}
        onSubmit={handleSubmit}
        throwWarning={true}
      >
        {form}
      </Modal>
    );
  }
}

BatchPreparationForm.propTypes = {
};

// TODO: Optimize before putting back into code.
// class BarcodeInput extends PureComponent {
//   render() {
//     const {data, options, current, list, setPreparationList} = this.props;
//     // Create options for barcodes based on match typeId
//     const barcodesPrimary = Object.values(data.containers)
//     .reduce((result, container) => {
//       if (options.container.types[container.typeId].primary == 1) {
//         const specimen = data.specimens[container.specimenId];
//         const availableId = Object.keys(options.container.stati).find(
//           (key) => options.container.stati[key].label == 'Available'
//         );
//         const protocolExists = Object.values(options.specimen.protocols).find(
//           (protocol) => protocol.typeId == specimen.typeId
//         );
//
//         if (specimen.quantity != 0 && container.statusId == availableId
//             && protocolExists) {
//           if (current.typeId) {
//             if (
//                specimen.typeId == current.typeId
//                && container.centerId == current.centerId
//             ) {
//               const inList = Object.values(list).find((i) => i.container.id == container.id);
//               if (!inList) {
//                 result[container.id] = container.barcode;
//               }
//             }
//           } else {
//             result[container.id] = container.barcode;
//           }
//         }
//       }
//       return result;
//     }, {});
//
//     const handleSpecimenInput = (name, containerId) => containerId && setPreparationList(containerId);
//     return (
//       <SearchableDropdown
//         name={'containerId'}
//         label={'Specimen'}
//         onUserInput={handleSpecimenInput}
//         options={barcodesPrimary}
//       />
//     );
//   }
// }

export default BatchPreparationForm;
