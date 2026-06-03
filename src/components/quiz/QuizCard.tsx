import type { QuizQuestion } from "@/types";

export function QuizCard({ question, value, onChange }: { question: QuizQuestion; value?: number; onChange: (value: number) => void }) {
  return (
    <fieldset className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
      <legend className="mb-4 font-semibold text-lunar">{question.question}</legend>
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <label key={option} className="flex cursor-pointer items-start gap-3 rounded-md border border-white/10 bg-black/20 p-3 text-sm text-metal transition hover:border-gold/50">
            <input
              type="radio"
              className="mt-1 accent-gold"
              checked={value === index}
              onChange={() => onChange(index)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
