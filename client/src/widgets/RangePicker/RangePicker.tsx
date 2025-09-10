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
import clsx from "clsx";

export function RangePicker({
  minLabel,
  maxLabel,
  minKey,
  maxKey,
  identifier,
  wrapperClassName = "w-[180px]",
}: RangePickerProps) {
  const { isOpen, draftMin, draftMax } = useRangePickerState(identifier);

  const close = () => closeRangePicker(identifier);

  useSetValues({ minKey, maxKey, identifier });

  return (
    <div
      className={clsx("border border-gray-500 rounded-xl", wrapperClassName)}
    >
      <Trigger
        minLabel={minLabel}
        maxLabel={maxLabel}
        minKey={minKey}
        maxKey={maxKey}
        identifier={identifier}
      />
      <Modal isModalVisible={isOpen} onClose={close}>
        <FormWrapper
          main={
            <>
              <LabelWrapper label={minLabel}>
                <Input
                  value={draftMin}
                  onChange={(value) => setDraftMin(identifier, value)}
                />
              </LabelWrapper>
              <LabelWrapper label={maxLabel}>
                <Input
                  value={draftMax}
                  onChange={(value) => setDraftMax(identifier, value)}
                />
              </LabelWrapper>
            </>
          }
          footer={
            <Actions minKey={minKey} maxKey={maxKey} identifier={identifier} />
          }
        />
      </Modal>
    </div>
  );
}
