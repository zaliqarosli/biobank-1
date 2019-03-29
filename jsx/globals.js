import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

import Modal from 'Modal';
import ContainerParentForm from './containerParentForm';

/**
 * Biobank Globals Component
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 * */

/* TODO: Consider making a global component that is passed props to generate all
 * these fields*/

class Globals extends Component {
  constructor() {
    super();
    this.increaseCycle = this.increaseCycle.bind(this);
    this.decreaseCycle = this.decreaseCycle.bind(this);
  }

  increaseCycle() {
    this.props.editSpecimen(this.props.target.specimen)
    .then(() => {
      let cycle = this.props.specimen.fTCycle;
      cycle++;
      this.props.setSpecimen('fTCycle', cycle);
})
    .then(()=>this.props.updateSpecimen(this.props.specimen));
  }

  decreaseCycle() {
    this.props.editSpecimen(this.props.target.specimen)
    .then(() => {
      let cycle = this.props.specimen.fTCycle;
      cycle--;
      this.props.setSpecimen('fTCycle', cycle);
})
    .then(()=>this.props.updateSpecimen(this.props.specimen));
  }

  render() {
    const specimenTypeField = () => {
      if (this.props.target.specimen) {
        return (
          <div className="item">
            <div className='field'>
              Specimen Type
              <div className='value'>
                {this.props.options.specimen.types[
                  this.props.target.specimen.typeId
                ].label}
              </div>
            </div>
          </div>
        );
      }
    };

    const containerTypeField = () => {
      return (
        <div className="item">
          <div className='field'>
            Container Type
            <div className='value'>
              {this.props.options.container.types[
                this.props.target.container.typeId
              ].label}
            </div>
          </div>
        </div>
      );
    };

    const updateQuantity = () => {
      if (loris.userHasPermission('biobank_specimen_update')) {
        return (
          <div className='action' title='Update Quantity'>
            <div
              className='action-button update'
              onClick={() => {
                this.props.edit('quantity');
                this.props.editSpecimen(this.props.target.specimen);
              }}
            >
              <span className='glyphicon glyphicon-chevron-right'/>
            </div>
          </div>
        );
      }
    };

    const quantityField = () => {
      if (this.props.target.specimen) {
        if (!this.props.editable.quantity) {
          return (
            <div className="item">
              <div className='field'>
                Quantity
                <div className='value'>
                  {this.props.target.specimen.quantity}
                  {' '+this.props.options.specimen.units[this.props.target.specimen.unitId].label}
                </div>
              </div>
              {updateQuantity()}
            </div>
          );
        } else {
          const units = this.props.mapFormOptions(
            this.props.options.specimen.typeUnits[this.props.target.specimen.typeId], 'label'
          );

          return (
            <div className="item">
              <div className='field'>
                Quantity
                <QuantityField
                  specimen={this.props.specimen}
                  errors={this.props.errors.specimen}
                  units={units}
                  clearAll={this.props.clearAll}
                  setSpecimen={this.props.setSpecimen}
                  updateSpecimen={()=>this.props.updateSpecimen(this.props.specimen)}
                />
              </div>
            </div>
          );
        }
      }
    };

    const fTCycleField = () => {
      if (this.props.target.specimen
          && this.props.options.specimen.types[
            this.props.target.specimen.typeId
          ].freezeThaw == 1) {
        const decreaseCycle = () => {
          if (this.props.target.specimen.fTCycle > 0) {
            return (
              <div className='action' title='Remove Cycle'>
                <span
                  className='action-button update'
                  onClick={this.decreaseCycle}
                >
                  <span className='glyphicon glyphicon-minus'/>
                </span>
              </div>
            );
          }
        };

        const increaseCycle = () => {
          return (
            <div className='action' title='Add Cycle'>
              <span className='action-button update' onClick={this.increaseCycle}>
                <span className='glyphicon glyphicon-plus'/>
              </span>
            </div>
          );
        };

        const updateFTCycle = () => {
          if (loris.userHasPermission('biobank_specimen_update')) {
            return <div>{decreaseCycle()} {increaseCycle()}</div>;
          }
        };

        return (
          <div className='item'>
            <div className='field'>
            Freeze-Thaw Cycle
              <div className='value'>
                {this.props.target.specimen.fTCycle}
              </div>
            </div>
            {updateFTCycle()}
          </div>
        );
      }
    };

    const updateTemperature = () => {
      if (loris.userHasPermission('biobank_container_update')) {
        return (
          <div className='action' title='Update Temperature'>
            <span
              className='action-button update'
              onClick={() => {
this.props.edit('temperature'); this.props.editContainer(this.props.target.container);
}}
            >
             <span className='glyphicon glyphicon-chevron-right'/>
            </span>
          </div>
        );
      }
    };

    const temperatureField = () => {
      if (!this.props.editable.temperature) {
        return (
          <div className="item">
            <div className='field'>
              Temperature
              <div className='value'>
              {this.props.target.container.temperature + '°C'}
              </div>
            </div>
            {updateTemperature()}
          </div>
        );
      } else {
        return (
          <div className="item">
            <div className='field'>
              Temperature
              <TemperatureField
              container={this.props.container}
              errors={this.props.errors.container}
              clearAll={this.props.clearAll}
              setContainer={this.props.setContainer}
              updateContainer={this.props.updateContainer}
              />
            </div>
          </div>
        );
      }
    };

    const updateStatus = () => {
      if (loris.userHasPermission('biobank_container_update')) {
        return (
          <div className='action' title='Update Status'>
            <span
              className='action-button update'
              onClick={() => {
                this.props.edit('status');
                this.props.editContainer(this.props.target.container);
              }}
            >
              <span className='glyphicon glyphicon-chevron-right'/>
            </span>
          </div>
        );
      }
    };

    const statusField = () => {
      if (!this.props.editable.status) {
        return (
          <div className="item">
            <div className='field'>
              Status
              <div className='value'>
                {this.props.options.container.stati[this.props.target.container.statusId].label}
              </div>
            </div>
            {updateStatus()}
          </div>
        );
      } else {
        const stati = this.props.mapFormOptions(this.props.options.container.stati, 'label');
        return (
          <div className="item">
            <div className='field'>
              Status
              <StatusField
                container={this.props.container}
                errors={this.props.errors.container}
                stati={stati}
                clearAll={this.props.clearAll}
                setContainer={this.props.setContainer}
                updateContainer={this.props.updateContainer}
              />
            </div>
          </div>
        );
      }
    };

    const updateCenter = () => {
      if (loris.userHasPermission('biobank_container_update')) {
        return (
          <div className='action' title='Update Status'>
            <span
              className='action-button update'
              onClick={() => {
                this.props.edit('center');
                this.props.editContainer(this.props.target.container);
              }}
            >
              <span className='glyphicon glyphicon-chevron-right'/>
            </span>
          </div>
        );
      }
    };

    const centerField = () => {
      if (!this.props.editable.center) {
        return (
          <div className="item">
            <div className='field'>
              Current Site
              <div className='value'>
                {this.props.options.centers[this.props.target.container.centerId]}
              </div>
            </div>
            {updateCenter()}
          </div>
        );
      } else {
        return (
          <div className="item">
            <div className='field'>
              Current Site
              <CenterField
                container={this.props.container}
                errors={this.props.errors.container}
                centers={this.props.options.centers}
                clearAll={this.props.clearAll}
                setContainer={this.props.setContainer}
                updateContainer={this.props.updateContainer}
              />
            </div>
          </div>
        );
      }
    };

    const originField = () => {
      return (
        <div className="item">
          <div className='field'>
            Origin Site
            <div className='value'>
              {this.props.options.centers[this.props.target.container.originId]}
            </div>
          </div>
        </div>
      );
    };

    const parentSpecimenField = () => {
;
      if ((this.props.target.specimen||{}).parentSpecimenIds) {
        let parentSpecimenBarcodes = [];
        Object.values(this.props.target.specimen.parentSpecimenIds).map(
          (id) => {
            const barcode = this.props.data.containers.primary[
                              this.props.data.specimens[id].containerId
                            ].barcode;

            // TODO: this may need to be broke down into columns in a different way.
            return parentSpecimenBarcodes = [
              ...parentSpecimenBarcodes,
              <div><Link to={`/barcode=${barcode}`}>{barcode}</Link><br/></div>,
            ];
          }
        );

        return (
          <div className='item'>
            <div className='field'>
            Parent Specimen
              <div className='value'>
                {parentSpecimenBarcodes || 'None'}
              </div>
            </div>
          </div>
        );
      }
    };

    const parentContainerField = () => {
      if (loris.userHasPermission('biobank_container_view')) {
        // Set Parent Container Barcode Value if it exists
        const parentContainerBarcodeValue = () => {
          if (this.props.target.container.parentContainerId) {
            const barcode = this.props.data.containers.nonPrimary[
                            this.props.target.container.parentContainerId
                          ].barcode;
            return <Link to={`/barcode=${barcode}`}>{barcode}</Link>;
          }
        };

        const updateParentContainer = () => {
          if (loris.userHasPermission('biobank_container_update')) {
            return (
              <div>
                <div className='action' title='Move Container'>
                  <span
                    className='action-button update'
                    onClick={() => {
                      this.props.edit('containerParentForm');
                      this.props.editContainer(this.props.target.container);
                    }}
                  >
                    <span className='glyphicon glyphicon-chevron-right'/>
                  </span>
                </div>
                <div>
                  <Modal
                    title='Update Parent Container'
                    onClose={this.props.clearAll}
                    show={this.props.editable.containerParentForm}
                    onSubmit={() => {
                      this.props.updateContainer(this.props.container, true);
                    }}
                  >
                    <ContainerParentForm
                      display={true}
                      target={this.props.target}
                      container={this.props.container}
                      options={this.props.options}
                      data={this.props.data}
                      mapFormOptions={this.props.mapFormOptions}
                      setContainer={this.props.setContainer}
                      updateContainer={this.props.updateContainer}
                    />
                  </Modal>
                </div>
              </div>
            );
          }
        };

        return (
          <div className="item">
            <div className='field'>
              Parent Container
              <div className='value'>
                {parentContainerBarcodeValue() || 'None'}
              </div>
              {(parentContainerBarcodeValue && this.props.target.container.coordinate) ?
              'Coordinate '+this.props.target.container.coordinate : null}
            </div>
            {updateParentContainer()}
          </div>
        );
      }
    };

    const candidateSessionField = () => {
      if (this.props.target.specimen) {
        return (
          <div className="item">
            <div className='field'>
              PSCID
              <div className='value'>
                <a href={loris.BaseURL+'/'+this.props.target.specimen.candidateId}>
                  {this.props.options.candidates[this.props.target.specimen.candidateId].pscid}
                </a>
              </div>
            </div>
            <div className='field'>
              Visit Label
              <div className='value'>
                <a href={
                  loris.BaseURL+'/instrument_list/?candID='+
                  this.props.target.specimen.candidateId+'&sessionID='+
                  this.props.target.specimen.sessionId
                }>
                  {this.props.options.sessions[this.props.target.specimen.sessionId].label}
                </a>
              </div>
            </div>
          </div>
        );
      }
    };

    const fieldList = (
      <div className='list'>
        {specimenTypeField()}
        {containerTypeField()}
        {quantityField()}
        {fTCycleField()}
        {temperatureField()}
        {statusField()}
        {centerField()}
        {originField()}
        {parentSpecimenField()}
        {parentContainerField()}
        {candidateSessionField()}
      </div>
    );

    return (
      <div className="globals">
        {fieldList}
      </div>
    );
  }
}

Globals.propTypes = {
};

/**
 * Biobank Container Status Field
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 * */

class StatusField extends Component {
  render() {
    return (
      <div className='inline-field'>
        <div style={{flex: '1 0 25%', minWidth: '90px'}}>
            <SelectElement
              name='statusId'
              options={this.props.stati}
              inputClass='col-lg-11'
              onUserInput={this.props.setContainer}
              value={this.props.container.statusId}
              errorMessage={this.props.errors.statusId}
            />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <ButtonElement
            label='Update'
            onUserInput={()=>this.props.updateContainer(this.props.container)}
            columnSize= 'col-lg-11'
          />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <a onClick={this.props.clearAll} style={{cursor: 'pointer'}}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

StatusField.propTypes = {
  setContainer: PropTypes.func.isRequired,
  clearAll: PropTypes.func,
  stati: PropTypes.object.isRequired,
  container: PropTypes.object.isRequired,
  updateContainer: PropTypes.func.isRequired,
  className: PropTypes.string,
};

/**
 * Biobank Container Temperature Form
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 * */

class TemperatureField extends Component {
  render() {
    return (
      <div className='inline-field'>
        <div style={{flex: '1 0 25%', minWidth: '90px'}}>
            <TextboxElement
              name='temperature'
              inputClass='col-lg-11'
              onUserInput={this.props.setContainer}
              value={this.props.container.temperature}
              errorMessage={this.props.errors.temperature}
            />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <ButtonElement
            label="Update"
            onUserInput={()=>this.props.updateContainer(this.props.container)}
            columnSize= 'col-lg-11'
          />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <a onClick={this.props.clearAll} style={{cursor: 'pointer'}}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

TemperatureField.propTypes = {
  setContainer: PropTypes.func.isRequired,
  clearAll: PropTypes.func,
  container: PropTypes.object.isRequired,
  updateContainer: PropTypes.func.isRequired,
  className: PropTypes.string,
};

/**
 * Biobank Container Center Field
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 * */

class CenterField extends Component {
  render() {
    return (
      <div className='inline-field'>
        <div style={{flex: '1 0 25%', minWidth: '90px'}}>
            <SelectElement
              name='centerId'
              options={this.props.centers}
              inputClass='col-lg-11'
              onUserInput={this.props.setContainer}
              value={this.props.container.centerId}
              errorMessage={this.props.errors.centerId}
            />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <ButtonElement
            label="Update"
            onUserInput={()=>this.props.updateContainer(this.props.container)}
            columnSize= 'col-lg-11'
          />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <a onClick={this.props.clearAll} style={{cursor: 'pointer'}}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

CenterField.propTypes = {
  setContainer: PropTypes.func.isRequired,
  clearAll: PropTypes.func.isRequired,
  centerIds: PropTypes.object.isRequired,
  container: PropTypes.object.isRequired,
  updateContainer: PropTypes.func.isRequired,
  className: PropTypes.string,
};

/**
 * Biobank Specimen Quantity Field
 *
 * @author Henri Rabalais
 * @version 1.0.0
 *
 * */
class QuantityField extends Component {
  render() {
    return (
      <div className='inline-field'>
        <div style={{flex: '1 0 25%', minWidth: '90px'}}>
          <TextboxElement
            name='quantity'
            inputClass='col-xs-11'
            onUserInput={this.props.setSpecimen}
            value={this.props.specimen.quantity}
            errorMessage={this.props.errors.quantity}
          />
        </div>
        <div style={{flex: '1 0 25%', minWidth: '90px'}}>
          <SelectElement
            name='unitId'
            inputClass='col-xs-11'
            options={this.props.units}
            onUserInput={this.props.setSpecimen}
            value={this.props.specimen.unitId}
            errorMessage={this.props.errors.unitId}
          />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <ButtonElement
            label="Update"
            onUserInput={this.props.updateSpecimen}
            columnSize= 'col-xs-11'
          />
        </div>
        <div style={{flex: '0 1 15%', margin: '0 1%'}}>
          <a onClick={this.props.clearAll} style={{cursor: 'pointer'}}>
            Cancel
          </a>
        </div>
      </div>
    );
  }
}

QuantityField.propTypes = {
  setSpecimen: PropTypes.func,
  clearAll: PropTypes.func,
  specimen: PropTypes.object,
  updateSpecimen: PropTypes.func,
  className: PropTypes.string,
};

export default Globals;
