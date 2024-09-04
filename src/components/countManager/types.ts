export interface CountManagerProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min: number;
  max: number;
}
