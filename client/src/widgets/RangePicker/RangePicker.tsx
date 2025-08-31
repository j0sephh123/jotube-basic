import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Modal } from "@shared/ui";
import { parse } from "./parse";
import { Input } from "./Input";
import { Display } from "./Display";
import { LabelWrapper } from "./LabelWrapper";
import { Actions } from "./Actions";
import { FormWrapper } from "./FormWrapper";
import {
  openRangePicker,
  closeRangePicker,
  useRangePickerState,
} from "./rangePickerStore";

export type Parsed = { min: number | null; max: number | null };

type Props = {
  minLabel: string;
  maxLabel: string;
};

export function RangePicker({ minLabel, maxLabel }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { min, max } = useMemo(() => parse(searchParams), [searchParams]);
  const { isOpen } = useRangePickerState();
  const [draftMin, setDraftMin] = useState<string>("");
  const [draftMax, setDraftMax] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      setDraftMin(min === null ? "" : String(min));
      setDraftMax(max === null ? "" : String(max));
    }
  }, [isOpen, min, max]);

  const open = () => openRangePicker();
  const close = () => closeRangePicker();

  const reset = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const next = new URLSearchParams(searchParams);
    next.delete("min");
    next.delete("max");
    setSearchParams(next);
  };

  const submit = () => {
    const next = new URLSearchParams(searchParams);
    const m1 = draftMin.trim();
    const m2 = draftMax.trim();
    const vMin = m1 === "" ? null : Number(m1);
    const vMax = m2 === "" ? null : Number(m2);
    if (vMin !== null && Number.isNaN(vMin)) return;
    if (vMax !== null && Number.isNaN(vMax)) return;
    if (vMin !== null && vMax !== null && vMin > vMax) return;
    if (vMin === null) next.delete("min");
    else next.set("min", String(vMin));
    if (vMax === null) next.delete("max");
    else next.set("max", String(vMax));
    setSearchParams(next);
    close();
  };

  return (
    <div className="w-auto min-w-[200px] max-w-[300px]">
      <Display
        minLabel={minLabel}
        maxLabel={maxLabel}
        min={min}
        max={max}
        reset={reset}
        open={open}
      />
      <Modal isModalVisible={isOpen} onClose={close}>
        <FormWrapper
          main={
            <>
              <LabelWrapper label={minLabel}>
                <Input
                  value={draftMin}
                  onChange={(value) => setDraftMin(value)}
                />
              </LabelWrapper>
              <LabelWrapper label={maxLabel}>
                <Input
                  value={draftMax}
                  onChange={(value) => setDraftMax(value)}
                />
              </LabelWrapper>
            </>
          }
          footer={<Actions close={close} submit={submit} />}
        />
      </Modal>
    </div>
  );
}
