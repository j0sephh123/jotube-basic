import { useEffect, useState } from "react";
import { Modal } from "@shared/ui";
import { Input } from "./Input";
import { Display } from "./Display";
import { LabelWrapper } from "./LabelWrapper";
import { Actions } from "./Actions";
import { FormWrapper } from "./FormWrapper";
import { closeRangePicker, useRangePickerState } from "./rangePickerStore";
import { useParsedSearchParams } from "./useParsedSearchParams";

type Props = {
  minLabel: string;
  maxLabel: string;
};

export function RangePicker({ minLabel, maxLabel }: Props) {
  const { min, max } = useParsedSearchParams();
  const { isOpen } = useRangePickerState();
  const [draftMin, setDraftMin] = useState<string>("");
  const [draftMax, setDraftMax] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setDraftMin(min === null ? "" : String(min));
      setDraftMax(max === null ? "" : String(max));
    }
  }, [isOpen, min, max]);

  const close = () => closeRangePicker();

  return (
    <div className="w-auto min-w-[200px] max-w-[300px]">
      <Display minLabel={minLabel} maxLabel={maxLabel} min={min} max={max} />
      <Modal isModalVisible={isOpen} onClose={close}>
        <FormWrapper
          main={
            <>
              <LabelWrapper label={minLabel}>
                <Input value={draftMin} onChange={setDraftMin} />
              </LabelWrapper>
              <LabelWrapper label={maxLabel}>
                <Input value={draftMax} onChange={setDraftMax} />
              </LabelWrapper>
            </>
          }
          footer={<Actions draftMin={draftMin} draftMax={draftMax} />}
        />
      </Modal>
    </div>
  );
}
