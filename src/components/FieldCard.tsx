"use client";

import {
  Card,
  CardContent
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Cross, CrossIcon, Delete } from "lucide-react";
import { MdDeleteOutline } from "react-icons/md";
import { TiDelete } from "react-icons/ti";


export type FieldType = "string" | "number" | "boolean" | "nested" | "objectId" | "float" | "array";

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
  setFieldList: (updatedFields: Field[]) => void;
  renderFields: (list: Field[], updateList: (fields: Field[]) => void) => React.ReactNode;
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

  const handleFieldChange = (key: keyof Field, value: any) => {
    const updatedFields = [...fieldList];
    updatedFields[index] = { ...updatedFields[index], [key]: value };

    if (key === "type" && value !== "nested") {
      updatedFields[index].fields = [];
    }

    setFieldList(updatedFields);
  };

  const handleRemove = () => {
    const updated = [...fieldList];
    updated.splice(index, 1);
    setFieldList(updated);
  };

  return (
    <Card className="mb-4 w-auto">
      <CardContent className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 w-full min-w-0">
          <Input
            placeholder="Field Name"
            value={field.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            className="flex-1 min-w-0 "
          />

          <Select
            value={field.type}
            
            onValueChange={(value) => handleFieldChange("type", value)}
          >
            <SelectTrigger className="flex-1 min-w-0 cursor-pointer">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent className="cursor-pointer">
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="nested">Nested</SelectItem>
              <SelectItem value="float">Float</SelectItem>
              <SelectItem value="objectId">ObjectId</SelectItem>
              <SelectItem value="array">Array</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Label className="whitespace-nowrap">Required</Label>
            <Switch
              checked={field.required}
              onCheckedChange={(val) => handleFieldChange("required", val)}
            />
          </div>

          <Button
            variant="outline"
            onClick={handleRemove}
            className="w-full md:w-auto bg-zinc-300 cursor-pointer"
          >
            {/* Remove */}
           <MdDeleteOutline />
           {/* <TiDelete className="size={40}"/> */}
           
            
          </Button>
        </div>

       {field.type === "nested" && (
  <div className="mt-4 space-y-4 w-full">
    {renderFields(field.fields, (updated) => {
      const updatedFieldList = [...fieldList];
      updatedFieldList[index] = {
        ...field,
        fields: updated,
      };
      setFieldList(updatedFieldList);
    })}
    <div className="flex justify-start">
      <Button
        size="sm"
        className="bg-blue-500 hover:bg-blue-600 cursor-pointer"
        onClick={() => {
          const updatedFieldList = [...fieldList];
          updatedFieldList[index].fields.push(defaultField());
          setFieldList(updatedFieldList);
        }}
      >
        + Add Nested Field
      </Button>
    </div>
  </div>
)}



      </CardContent>
    </Card>
  );
};

export default FieldCard;
