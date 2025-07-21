
"use client";

import { useState } from "react";
import FieldCard, { Field, FieldType } from "@/components/FieldCard";
import { Button } from "./ui/button";
import LivePreview from "@/components/LivePreview";


const createEmptyField = (): Field => ({
  name: "",
  type: "" as FieldType,
  required: false,
  fields: [],
});

const SchemaBuilder = () => {

  const [schemaFields, setSchemaFields] = useState<Field[]>([]);

  
  const handleAddField = (
    currentFields: Field[],
    updateFields: (updated: Field[]) => void
  ) => {
    const newField = createEmptyField();
    updateFields([...currentFields, newField]);
  };

   

  const renderFieldCards = (
    currentList: Field[],
    updateList: (newFields: Field[]) => void
  ) => {
    return currentList.map((item, idx) => (
      <FieldCard
        key={idx}
        field={item}
        index={idx}
        fieldList={currentList}
        setFieldList={updateList}
        renderFields={renderFieldCards}
        defaultField={createEmptyField}
      />
    ));
  };

  
  const generatePreviewObject = (fieldArray: Field[]): any => {
    const result: Record<string, any> = {};

    fieldArray.forEach((field) => {
      if (!field.name) return;

      if (field.type === "nested") {
        result[field.name] = generatePreviewObject(field.fields);
      } else {
        result[field.name] = field.type;
      }
    });

    return result;
  };

  return (
    <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto items-start">
      <h1 className="text-2xl font-semibold">Schema Builder</h1>

      <div className="w-full ">
        {renderFieldCards(schemaFields, setSchemaFields)}
      </div>

      <Button onClick={() => handleAddField(schemaFields, setSchemaFields)} className="bg-blue-500 hover:bg-blue-700 cursor-pointer">
        Add Field
      </Button>

      <LivePreview data={generatePreviewObject(schemaFields)} /> 
      <Button className="bg-zinc-600">
        submit
      </Button>
    </div>
  );
};

export default SchemaBuilder;

