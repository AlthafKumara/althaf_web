/**
 * @fileoverview Reusable Loading Spinner
 *
 * A small, animated circular spinner used across features to indicate
 * loading states. Extracted to eliminate the duplicated spinner markup
 * that was previously copy-pasted in Skills, ActivityDashboard, etc.
 *
 * @module core/ui/Spinner
 */

/**
 * Props for the {@link Spinner} component.
 * @property className - Optional additional CSS classes to merge.
 */
interface SpinnerProps {
  className?: string;
}

/**
 * Renders an animated loading spinner.
 *
 * @example
 * ```tsx
 * <Spinner />                           // Default size
 * <Spinner className="w-12 h-12" />     // Custom size
 * ```
 */
export default function Spinner({ className = "w-8 h-8" }: SpinnerProps) {
  return (
    <div
      className={`border-4 border-primary border-t-transparent rounded-full animate-spin ${className}`}
      role="status"
      aria-label="Loading"
    />
  );
}
