"use client";

import { useState } from "react";
import FieldCard, { Field, FieldType } from "@/components/FieldCard";
import { Button } from "./ui/button";
import LivePreview from "@/components/LivePreview";

const defaultField = (): Field => ({
  name: "",
  type: "" as FieldType,
  required: false,
  fields: [],
});

const SchemaBuild = () => {
  const [fields, setFields] = useState<Field[]>([]);

  const addField = (parentFields: Field[], setParentFields: (fields: Field[]) => void) => {
    setParentFields([...parentFields, defaultField()]);
  };

  const renderFields = (
    fieldList: Field[],
    setFieldList: (fields: Field[]) => void
  ) => {
    return fieldList.map((field, index) => (
      <FieldCard
        key={index}
        field={field}
        index={index}
        fieldList={fieldList}
        setFieldList={setFieldList}
        renderFields={renderFields}
        defaultField={defaultField}
      />
    ));
  };

  const buildPreview = (fields: Field[]): any => {
    const result: Record<string, any> = {};
    for (const field of fields) {
      if (!field.name) continue;
      if (field.type === "nested") {
        result[field.name] = buildPreview(field.fields);
      } else {
        result[field.name] = field.type;
      }
    }
    return result;
  };

  return (
    <div className="flex flex-col items-start p-6 gap-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold">Schema Builder</h1>
      <div className="w-full">{renderFields(fields, setFields)}</div>
      <Button onClick={() => addField(fields, setFields)}>Add Field</Button>
      <LivePreview data={buildPreview(fields)} />
    </div>
  );
};

export default SchemaBuild;
