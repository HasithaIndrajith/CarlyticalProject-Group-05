import React from "react";
import { Uploader } from "rsuite";
import "rsuite/dist/rsuite.css";
function PredictCustomerSetPage() {

  return (
    <div>
      <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
        <div
          style={{
            height: 200,
            width:'100%',
            display:"flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span>Click or Drag and drop choose file to upload your files.</span>
          <span>Only CSV files are allowed here</span>
        </div>
      </Uploader>
    </div>
  );
}

export default PredictCustomerSetPage;
