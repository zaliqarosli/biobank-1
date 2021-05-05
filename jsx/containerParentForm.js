import React from 'react';
import ContainerDisplay from './containerDisplay';
import PropTypes from 'prop-types';

/**
 * Biobank Container Parent Form
 *
 * Fetches data from Loris backend and displays a form allowing
 * to specimen a biobank file attached to a specific instrument
 *
 * @param {object} props
 * @return {*}
 **/
function ContainerParentForm({
  display,
  data,
  container,
  contHand,
  options,
}) {
  // TODO: there might be a better way to do this.
  const setInheritedProperties = (name, containerId) => {
    if (!containerId) {
      return;
    }

    const parentContainer = data.containers[containerId];
    contHand.set('parentContainerId', parentContainer.id);
    // container.coordinate = null;
    // container.temperature = parentContainer.temperature;
    // container.centerId = parentContainer.centerId;
    // container.statusId = parentContainer.statusId;
  };

  const removeChildContainers = (object, id) => {
    delete object[id];
    for (let key in data.containers) {
      if (id == data.containers[key].parentContainerId) {
        object = removeChildContainers(object, key);
      }
    }
    return object;
  };

  let containerBarcodesNonPrimary = Object.values(data.containers)
  .reduce((result, container) => {
    if (options.container.types[container.typeId].primary == 0) {
      const dimensions = options.container.dimensions[data.containers[
        container.id
      ].dimensionId];
      const capacity = dimensions.x * dimensions.y * dimensions.z;
      const available = capacity - container.childContainerIds.length;
      result[container.id] = container.barcode + ' ('+available+ ' Available Spots)';
    }
    return result;
  }, {});

  // Delete child containers from options if a container is being placed in a
  // another container.
  // if (props.container) {
  //   containerBarcodesNonPrimary = removeChildContainers(
  //     containerBarcodesNonPrimary,
  //     props.container.id
  //   );
  // }

  const renderContainerDisplay = () => {
    if (!(container.parentContainerId && display)) {
      return;
    }

    const coordinates = data.containers[
      container.parentContainerId
    ].childContainerIds
    .reduce((result, id) => {
      const container = data.containers[id];
      if (container.coordinate) {
        result[container.coordinate] = id;
      }
      return result;
    }, {});

    return (
      <ContainerDisplay
        data={data}
        coordinates={coordinates}
        options={options}
        select={true}
        selectedCoordinate={container.coordinate}
        setContainer={contHand.set}
      />
    );
  };

  return (
    <div className='row'>
      <div className="col-lg-11">
        <SearchableDropdown
          name="parentContainerId"
          label="Parent Container Barcode"
          options={containerBarcodesNonPrimary}
          onUserInput={setInheritedProperties}
          value={container.parentContainerId}
        />
      </div>
      {renderContainerDisplay()}
    </div>
  );
}

ContainerParentForm.propTypes = {
  data: PropTypes.object,
  container: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
};

export default ContainerParentForm;
