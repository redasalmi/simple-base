import { createSignal, For } from "solid-js";

export default function ProgressAndRange() {
  const [progress, setProgress] = createSignal(64);

  return (
    <div class="preview-stack">
      <label class="sb-field">
        <span class="sb-field-title">Example completion</span>
        <input
          class="sb-range"
          type="range"
          min="0"
          max="100"
          value={progress()}
          onInput={(event) => setProgress(Number(event.currentTarget.value))}
        />
      </label>
      <div class="sb-range-readout">
        <span>0%</span>
        <output>{progress()}%</output>
        <span>100%</span>
      </div>
      <div
        class="sb-progress"
        role="progressbar"
        aria-label="Example completion"
        aria-valuenow={progress()}
        aria-valuemin={0}
        aria-valuemax={100}
        style={{ "--sb-progress-value": `${progress()}%` }}
      >
        <span />
      </div>
      <For each={["warning", "danger", "info"] as const}>
        {(status) => (
          <div
            class="sb-progress"
            data-status={status}
            role="progressbar"
            aria-label={`Example ${status} progress`}
            aria-valuenow={progress()}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{ "--sb-progress-value": `${progress()}%` }}
          >
            <span class="sb-progress-value" />
          </div>
        )}
      </For>
      <div class="sb-progress" data-state="indeterminate" role="progressbar" aria-label="Loading">
        <span class="sb-progress-value" />
      </div>
    </div>
  );
}
