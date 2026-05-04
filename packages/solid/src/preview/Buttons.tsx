import { Button } from "../components/Button";

export function Buttons() {
  return (
    <div class="flex flex-col gap-4">
      <h1>Buttons</h1>
      <div class="grid grid-cols-3 gap-4">
        <Button variant="primary" size="small">
          Primary Small
        </Button>
        <Button variant="secondary" size="small">
          Secondary Small
        </Button>
        <Button variant="tertiary" size="small">
          Tertiary Small
        </Button>
        <Button variant="primary" size="medium">
          Primary Medium
        </Button>
        <Button variant="secondary" size="medium">
          Secondary Medium
        </Button>
        <Button variant="tertiary" size="medium">
          Tertiary Medium
        </Button>
        <Button variant="primary" size="large">
          Primary Large
        </Button>
        <Button variant="secondary" size="large">
          Secondary Large
        </Button>
        <Button variant="tertiary" size="large">
          Tertiary Large
        </Button>
        <Button variant="ghost" size="small">
          Ghost Small
        </Button>
        <Button variant="danger" size="small">
          Danger Small
        </Button>
        <Button variant="danger-subtle" size="small">
          Danger Subtle Small
        </Button>
        <Button variant="ghost" size="medium">
          Ghost Medium
        </Button>
        <Button variant="danger" size="medium">
          Danger Medium
        </Button>
        <Button variant="danger-subtle" size="medium">
          Danger Subtle Medium
        </Button>
        <Button variant="ghost" size="large">
          Ghost Large
        </Button>
        <Button variant="danger" size="large">
          Danger Large
        </Button>
        <Button variant="danger-subtle" size="large">
          Danger Subtle Large
        </Button>
        <Button variant="danger" size="large" disabled>
          Danger Large Disabled
        </Button>
        <Button variant="ghost" size="large" disabled>
          Ghost Large Disabled
        </Button>
        <Button variant="danger-subtle" size="large" disabled>
          Danger Subtle Large Disabled
        </Button>
      </div>
    </div>
  );
}
