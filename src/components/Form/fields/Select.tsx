// react
import { useId } from "react";

// services, features, and other libraries
import { useFieldContext } from "@/components/Form";

// components
import { Label } from "@/components/ui/custom/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/custom/select";
import FieldErrors from "@/components/Form/FieldErrors";

// types
import type { ComponentPropsWithoutRef } from "react";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends ComponentPropsWithoutRef<typeof Select> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export default function SelectField({ label, options, placeholder, ...props }: SelectFieldProps) {
  // Get the field context
  const {
    name,
    state: { value },
    handleChange,
    handleBlur,
  } = useFieldContext<string>();

  // Generate a unique id
  const id = useId();

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <Select name={name} items={options} value={value} onValueChange={(value) => handleChange(value as string)} {...props}>
        <SelectTrigger id={id} onBlur={handleBlur} className="min-w-96">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>
              <p>{placeholder}</p>
            </SelectLabel>
            {options.map(({ value, label }) => (
              <SelectItem key={value} value={value} className="min-w-96">
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldErrors />
    </>
  );
}
