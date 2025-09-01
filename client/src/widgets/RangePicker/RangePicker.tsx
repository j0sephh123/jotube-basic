import { Modal } from "@shared/ui";
import { Trigger } from "./components";
import { LabelWrapper, FormWrapper, Actions, Input } from "./ui";
import {
  closeRangePicker,
  useRangePickerState,
  setDraftMin,
  setDraftMax,
} from "./rangePickerStore";
import { useSetValues } from "./hooks";
import { type RangePickerProps } from "./types";

export function RangePicker({
  minLabel,
  maxLabel,
  minKey,
  maxKey,
}: RangePickerProps) {
  const { isOpen, draftMin, draftMax } = useRangePickerState();

  const close = () => closeRangePicker();

  useSetValues({ minKey, maxKey });

  return (
    <div className="w-auto min-w-[200px] max-w-[300px]">
      <Trigger
        minLabel={minLabel}
        maxLabel={maxLabel}
        minKey={minKey}
        maxKey={maxKey}
      />
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
          footer={<Actions minKey={minKey} maxKey={maxKey} />}
        />
      </Modal>
    </div>
  );
}
