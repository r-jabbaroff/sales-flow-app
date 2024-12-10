import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MdError } from "react-icons/md";
import { useFormContext } from "react-hook-form";

export default function CustomerName() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mt-5 flex flex-col gap-2">
      <Label htmlFor="customer-name" className="text-slate-600">
        {`Customer Name`}
      </Label>
      <div className="flex items-center gap-2">
        <Input
          type="text"
          id="customer-name"
          className="h-11 shadow-none"
          placeholder="Joe Down..."
          {...register("customerName")}
        />
      </div>

      {errors.customerName && (
        <div className="flex items-center gap-1 text-[13px] text-red-500">
          <MdError />
          <p>{errors.customerName.message as string}</p>
        </div>
      )}
    </div>
  );
}
