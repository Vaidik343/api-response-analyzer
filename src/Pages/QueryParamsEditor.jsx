import React from "react";

import CustomButton from "../components/CustomButton";
import CustomInputs from "../components/CustomInputs";


const QueryParamsEditor = ({ params, setParams }) => {
  function addParam() {
    setParams([...params, { key: "", value: "" }]);
  }

  function updateParam(index, field, value) {
    const updated = [...params];
    updated[index][field] = value;
    setParams(updated);
  }

  function removeParam(index) {
    setParams(params.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-3">
      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium">Query Parameters</h3>

        <CustomButton
          type="button"
          className="w-auto px-3 py-1 text-sm bg-gray-200 text-black"
          onClick={addParam}
        >
          + Add Param
        </CustomButton>
      </div>

      {/* Empty */}
      {params.length === 0 && (
        <p className="text-sm text-gray-500">
          No query parameters added
        </p>
      )}

      {/* Params list */}
      {params.map((param, index) => (
        <div
          key={index}
          className="grid grid-cols-5 gap-2 items-center"
        >
          <CustomInputs
            placeholder="Key"
            value={param.key}
            onChange={(e) =>
              updateParam(index, "key", e.target.value)
            }
            className="col-span-2"
          />

          <CustomInputs
            placeholder="Value"
            value={param.value}
            onChange={(e) =>
              updateParam(index, "value", e.target.value)
            }
            className="col-span-2"
          />

          <CustomButton
            type="button"
            className="w-auto bg-red-500 text-white"
            onClick={() => removeParam(index)}
          >
            ✕
          </CustomButton>
        </div>
      ))}
    </div>
  );
};

export default QueryParamsEditor;
