import { useState } from "react";
// eslint-disable-next-line import/no-internal-modules
import Modal from "@shared/ui/Modal";
import { Button } from "@shared/ui";

type StoryboardLimitDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (limit?: number) => void;
  isLoading?: boolean;
};

export function StoryboardLimitDialog({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
}: StoryboardLimitDialogProps) {
  const [selectedOption, setSelectedOption] = useState<"all" | "number">(
    "number"
  );
  const [numberValue, setNumberValue] = useState<string>("10");

  const handleConfirm = () => {
    if (selectedOption === "all") {
      onConfirm();
    } else {
      const num = parseInt(numberValue);
      if (num > 0 && num <= 100) {
        onConfirm(num);
      }
    }
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "" || (/^\d+$/.test(value) && parseInt(value) <= 100)) {
      setNumberValue(value);
    }
  };

  const isValidNumber =
    selectedOption === "all" ||
    (numberValue !== "" &&
      parseInt(numberValue) > 0 &&
      parseInt(numberValue) <= 100);

  return (
    <Modal
      isModalVisible={isOpen}
      onClose={isLoading ? () => {} : onClose}
      maxWidth="500px"
      maxHeight="400px"
    >
      <div className="p-6">
        <h3 className="font-bold text-lg mb-4">Get Storyboards</h3>
        <div className="py-4">
          <p className="mb-4">How many storyboards would you like to fetch?</p>

          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="limitOption"
                value="all"
                checked={selectedOption === "all"}
                onChange={() => setSelectedOption("all")}
                className="radio radio-primary"
                disabled={isLoading}
              />
              <span>All storyboards</span>
            </label>

            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="limitOption"
                value="number"
                checked={selectedOption === "number"}
                onChange={() => setSelectedOption("number")}
                className="radio radio-primary"
                disabled={isLoading}
              />
              <span>Specific number:</span>
              <input
                type="text"
                value={numberValue}
                onChange={handleNumberChange}
                placeholder="1-100"
                className="input input-bordered input-sm w-20"
                disabled={isLoading || selectedOption !== "number"}
                maxLength={3}
              />
            </label>
          </div>

          {selectedOption === "number" &&
            numberValue !== "" &&
            (parseInt(numberValue) <= 0 || parseInt(numberValue) > 100) && (
              <div className="alert alert-warning mt-4">
                <span>Please enter a number between 1 and 100</span>
              </div>
            )}
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isValidNumber || isLoading}
          >
            {isLoading ? "Processing..." : "Get Storyboards"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
