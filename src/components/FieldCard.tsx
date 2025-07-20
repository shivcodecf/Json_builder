// components/FieldCard.tsx
"use client";

import {
  Card,
  CardContent
} from "./ui/card";
import {
  Input
} from "./ui/input";
import {
  Button
} from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import {
  Switch
} from "./ui/switch";
import {
  Label
} from "./ui/label";

export type FieldType = "string" | "number" | "boolean" | "nested";

export type Field = {
  name: string;
  type: FieldType;
  required: boolean;
  fields: Field[];
};

type Props = {
  field: Field;
  index: number;
  fieldList: Field[];
  setFieldList: (fields: Field[]) => void;
  renderFields: (
    fieldList: Field[],
    setFieldList: (fields: Field[]) => void
  ) => React.ReactNode;
  defaultField: () => Field;
};

const FieldCard = ({
  field,
  index,
  fieldList,
  setFieldList,
  renderFields,
  defaultField,
}: Props) => {
  const updateField = (
    key: keyof Field,
    value: any
  ) => {
    const updated = [...fieldList];
    updated[index] = { ...updated[index], [key]: value };
    if (key === "type" && value !== "nested") {
      updated[index].fields = [];
    }
    setFieldList(updated);
  };

  const removeField = () => {
    const updated = [...fieldList];
    updated.splice(index, 1);
    setFieldList(updated);
  };

  return (
   <Card className="mb-4 p-4 w-full">
  <CardContent className="flex flex-col space-y-4">
    {/* Main Input Row */}
    <div className="flex flex-col md:flex-row md:items-center md:gap-4 gap-3 w-full">
      <Input
        placeholder="Field Name"
        value={field.name}
        onChange={(e) => updateField("name", e.target.value)}
        className="w-full md:w-1/3"
      />

      <Select
        value={field.type}
        onValueChange={(value) => updateField("type", value)}
      >
        <SelectTrigger className="w-full md:w-1/4">
          <SelectValue placeholder="type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="string">String</SelectItem>
          <SelectItem value="number">Number</SelectItem>
          <SelectItem value="boolean">Boolean</SelectItem>
          <SelectItem value="nested">Nested</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Label className="whitespace-nowrap">Required</Label>
        <Switch
          checked={field.required}
          onCheckedChange={(checked) => updateField("required", checked)}
        />
      </div>

      <Button
        variant="destructive"
        onClick={removeField}
        className="w-full md:w-auto"
      >
        Remove
      </Button>
    </div>

    {/* Nested Fields */}
    {field.type === "nested" && (
      <div className="ml-4 border-l-2 pl-4">
        {renderFields(field.fields, (updated) => {
          const updatedList = [...fieldList];
          updatedList[index].fields = updated;
          setFieldList(updatedList);
        })}

        <Button
          size="sm"
          className="mt-2"
          onClick={() => {
            const updatedList = [...fieldList];
            updatedList[index].fields.push(defaultField());
            setFieldList(updatedList);
          }}
        >
          Add Nested Field
        </Button>
      </div>
    )}
  </CardContent>
</Card>

  );
};

export default FieldCard;
