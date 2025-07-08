import { useEffect, useState } from "react";

import UiCallendar from "../../UI/UiCallendar/UiCallendar";

import "./MainForm.scss";
import { useFormStore } from "full-form-control";
import InputElement from "../../UI/InputElement/InputElement";
import { formSchema } from "../../utils/validateForm";

const MainForm: React.FC = () => {
    const { formValues, setFormValues, errors, isValid, unsubscribeFromStore } = useFormStore();

    const parseCustomDate = (dateString: string): Date | null => {
        const parts = dateString.match(/(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})/);
        if (!parts) return null;

        const [, day, month, year, hours, minutes] = parts.map(Number);
        return new Date(year, month - 1, day, hours, minutes);
    };

    const setInputData = async (name: string, value: Date | string | null) => {
        if (name === "expireDate") {
            if (!value) {
                return; // Prevent execution if value is null/invalid
            }

            const formattedDate = value
                .toLocaleString("ru-RU", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false, // Ensures 24-hour format
                })
                .replace(",", ""); // Remove comma between date and time
            console.log("Formatted Date:", formattedDate);
            setFormValues({ [name]: formattedDate }, { type: "zod", schema: formSchema });
        } else {
            setFormValues({ [name]: value }, { type: "zod", schema: formSchema });
        }
    };
    const handleShortLink = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            // send data to server
            // await addFileLink(
            //     scriptId,
            //     formData.expireDate ? parseCustomDate(formData.expireDate) : null,
            //     formData.unlimited
            // );

            unsubscribeFromStore();
        } catch (error: Error | any) {
            console.error(error);
            // setError(error?.response?.data?.message as string);
        }
    };
    return (
        <form className="main-form" onSubmit={handleShortLink}>
            <InputElement
                inputType="text"
                placeholder="Enter your link"
                name="link"
                onChange={(e) => setInputData("link", e.target.value)}
                value={formValues.link || ""}
                label="Ener URL here"
                errorMessage={errors.link}
                autoComplete="off"
                size="medium-size"
                className="main-form__input"
            />
            <InputElement
                inputType="text"
                placeholder="Alias for link"
                name="alias"
                onChange={(e) => setInputData("alias", e.target.value)}
                value={formValues.alias || ""}
                label="Alias"
                errorMessage={errors.alias}
                autoComplete="off"
                size="medium-size"
                className="main-form__input"
            />
            <UiCallendar
                label="Expiration Date"
                value={formValues.expireDate ? parseCustomDate(formValues.expireDate) : null}
                onChange={(date) => setInputData("expireDate", date)}
                placeHolder="Select expiration date and time"
                className="main-form__calendar"
                errorMessage={errors.expireDate}
                timeSelect={true}
            />
            <button
                type="submit"
                className={`main-form__button ${!isValid ? "disabled" : ""}`}
                disabled={!isValid}
            >
                Short It
            </button>
        </form>
    );
};
export default MainForm;
