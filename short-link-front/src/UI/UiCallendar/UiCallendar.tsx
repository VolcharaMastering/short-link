import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./UiCallendar.scss";

interface PropsUiCallendar {
    onChange?: (date: Date | null) => void;
    className?: string;
    value: Date | null;
    name?: string;
    label?: string;
    placeHolder?: string;
    size?: string;
    maxWidth?: string;
    errorMessage?: string;
    timeSelect?: boolean;
    timeSelectClass?: string;
}

const UiCallendar: React.FC<PropsUiCallendar> = ({
    value,
    onChange,
    placeHolder,
    maxWidth,
    className,
    label,
    errorMessage,
    timeSelect = false,
}) => {
    return (
        <div
            className="callendar" // Custom styles for Select container
            style={
                {
                    ...(maxWidth && { "--max-width": maxWidth }),
                } as React.CSSProperties
            }
        >
            {label && (
                <label className={`callendar__label ${timeSelect ? "no-margin" : ""}`}>
                    {label}
                </label>
            )}

            <DatePicker
                selected={value || null}
                onChange={onChange}
                showIcon
                placeholderText={placeHolder}
                className={className ? className : ""}
                showPopperArrow={false}
                maxDate={timeSelect ? undefined : new Date()} // Allow all future dates if timeSelect is true
                minDate={timeSelect ? new Date() : undefined} // Prevent selecting past dates
                dateFormat={timeSelect ? "dd.MM.yyy HH:mm" : "dd.MM.yyy"}
                timeFormat={timeSelect ? "HH:mm" : ""} // set time format
                minTime={
                    value && value.toDateString() === new Date().toDateString()
                        ? new Date()
                        : new Date(0, 0, 0, 0, 0)
                }
                maxTime={new Date(0, 0, 0, 23, 59)} // Allow full-day selection
                showTimeSelect={timeSelect && true}
            />
            {errorMessage && (
                <span className="callendar__error-message">
                    <span className="error-message_icon" />
                    <p className="error-message">{errorMessage}</p>
                </span>
            )}
        </div>
    );
};

export default UiCallendar;
