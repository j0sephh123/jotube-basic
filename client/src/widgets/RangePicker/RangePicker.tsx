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

type Props = {
  minLabel: string;
  maxLabel: string;
};

export function RangePicker({ minLabel, maxLabel }: Props) {
  const { isOpen, draftMin, draftMax } = useRangePickerState();

  const close = () => closeRangePicker();

  useSetValues();

  return (
    <div className="w-auto min-w-[200px] max-w-[300px]">
      <Trigger minLabel={minLabel} maxLabel={maxLabel} />
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
          footer={<Actions />}
        />
      </Modal>
    </div>
  );
}
