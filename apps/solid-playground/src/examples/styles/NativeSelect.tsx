export default function NativeSelect() {
  return (
    <div class="preview-stack">
      <div class="preview-fields">
        <label class="sb-field">
          <span class="sb-field-title">Delivery</span>
          <span class="sb-select-wrap">
            <select class="sb-select">
              <option>Daily summary</option>
              <option>Weekly summary</option>
              <option>Never</option>
            </select>
          </span>
        </label>
        <label class="sb-field">
          <span class="sb-field-title">Locked delivery</span>
          <span class="sb-select-wrap">
            <select class="sb-select" disabled>
              <option>Managed by your team</option>
            </select>
          </span>
        </label>
      </div>
    </div>
  );
}
