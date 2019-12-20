looker.plugins.visualizations.add({
    // Id and Label are legacy properties that no longer have any function besides documenting
    // what the visualization used to have. The properties are now set via the manifest
    // form within the admin/visualizations page of Looker
    id: "dataTable",
    label: "Data Table",
    options: {
      font_size: {
        type: "string",
        label: "Font Size",
        values: [
          {"Larger": "larger"},
          {"Smaller": "smaller"}
        ],
        display: "radio",
        default: "larger"
      }
    },
    // Set up the initial state of the visualization
    create: function(element, config) {
      element.innerHTML = `<table id="example" class="display" width="100%"></table>`;
  
    },
    // Render in response to the data or settings changing
    updateAsync: function(data, element, config, queryResponse, details, done) {
  
      // Clear any errors from previous updates
      this.clearErrors();
  
      // Throw some errors and exit if the shape of the data isn't what this chart needs
      if (queryResponse.fields.dimensions.length == 0) {
        this.addError({title: "No Dimensions", message: "This chart requires dimensions."});
        return;
      }
      var columns = [];
      queryResponse.fields.dimensions_like.forEach(item => columns.push({title:item.name}));
      
        $('#example').DataTable( {
            data    : data,
            columns : columns 
        } );
    
           // Insert the data into the page
      //this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(firstCell);
  
      // Set the size to the user-selected size
      //if (config.font_size == "smaller") {
      //  this._textElement.className = "data-table-text-smaller";
      //} else {
      //  this._textElement.className = "data-table-text-larger";
      //}
  
      // We are done rendering! Let Looker know.
      done();
    }
  });
  