"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useCreateQuery } from "./useCreateQuery";
import { TInputForm } from "@/types/inputForm";
import { useLayout } from "@/hooks/layout";

export const ComponentCreate = () => {
  const { setToast } = useLayout();
  const { createUser, isLoading } = useCreateQuery();
  const [isInput, setIsInput] = useState<TInputForm>({});

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIsInput((values) => ({ ...values, [name]: value }));
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    if (!isInput.name || !isInput.job) {
      return setToast({ massage: "Please enter name and job", error: true });
    }
    await createUser(isInput);
  };

  return (
    <form onSubmit={submitForm}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            placeholder="Enter Name"
            className="form-input"
            name="name"
            value={isInput.name || ""}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="job">Job</label>
          <input
            id="job"
            type="text"
            placeholder="Enter Job"
            className="form-input"
            name="job"
            value={isInput.job || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <button
        type="submit"
        className={
          "btn btn-primary !mt-6" + (isLoading ? " btn-primary/50" : "")
        }
        disabled={isLoading}
      >
        {isLoading ? "Prosess..." : "Save"}
      </button>
    </form>
  );
};
