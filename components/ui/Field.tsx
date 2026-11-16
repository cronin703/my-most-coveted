import type {
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

/**
 * Form primitives: a visible label on every field, hint and error wired with
 * aria-describedby, aria-invalid when in error. Placeholders only for format hints.
 */
type Shared = { id: string; label: string; hint?: string; error?: string; optional?: boolean };

const control =
  "w-full border-0 border-b border-stone bg-transparent px-0 py-3 text-[var(--text-body)] text-ink placeholder:text-stone/80 transition-colors duration-[var(--dur-hover)] hover:border-ink focus:border-ink focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent aria-[invalid=true]:border-error";

function Frame({ id, label, hint, error, optional, children }: Shared & { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="label text-ink">
        {label}
        {optional ? <span className="text-stone"> (optional)</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-[var(--text-small)] text-stone">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-[var(--text-small)] text-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function describedBy({ id, hint, error }: Shared) {
  if (error) return `${id}-error`;
  if (hint) return `${id}-hint`;
  return undefined;
}

export function Field(props: Shared & InputHTMLAttributes<HTMLInputElement>) {
  const { id, label, hint, error, optional, ...rest } = props;
  return (
    <Frame {...{ id, label, hint, error, optional }}>
      <input
        id={id}
        name={id}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(props)}
        className={`${control} min-h-12`}
        {...rest}
      />
    </Frame>
  );
}

export function Textarea(props: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { id, label, hint, error, optional, ...rest } = props;
  return (
    <Frame {...{ id, label, hint, error, optional }}>
      <textarea
        id={id}
        name={id}
        rows={5}
        required={!optional}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy(props)}
        className={`${control} resize-y`}
        {...rest}
      />
    </Frame>
  );
}

export function Select(
  props: Shared &
    SelectHTMLAttributes<HTMLSelectElement> & { options: { value: string; label: string }[] },
) {
  const { id, label, hint, error, optional, options, ...rest } = props;
  return (
    <Frame {...{ id, label, hint, error, optional }}>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={!optional}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy(props)}
          className={`${control} min-h-12 cursor-pointer appearance-none pr-8`}
          {...rest}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 right-1 -translate-y-1/2 text-stone"
        >
          ↓
        </span>
      </div>
    </Frame>
  );
}
