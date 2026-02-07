import React, { useMemo, useState } from 'react';
import { FormulaEntry, FormulaSection } from '../types';

const isAllowedExpression = (expression: string, allowedVariables: string[]) => {
  const cleaned = expression.replace(/,/g, '.').trim();
  if (!cleaned) {
    return { ok: false, reason: 'Zadejte výraz pro výpočet.' };
  }

  if (!/^[0-9+\-*/().\sA-Za-z_]+$/.test(cleaned)) {
    return { ok: false, reason: 'Výraz obsahuje nepovolené znaky.' };
  }

  const identifiers = cleaned.match(/[A-Za-z_][A-Za-z0-9_]*/g) ?? [];
  const unknown = identifiers.filter(id => !allowedVariables.includes(id));
  if (unknown.length > 0) {
    return { ok: false, reason: `Neznámé proměnné: ${unknown.join(', ')}` };
  }

  return { ok: true, cleaned };
};

const evaluateExpression = (
  expression: string,
  variables: Record<string, number>,
  allowedVariables: string[],
) => {
  const validation = isAllowedExpression(expression, allowedVariables);
  if (!validation.ok) {
    return { value: null as number | null, error: validation.reason };
  }

  try {
    const args = allowedVariables.map(name => variables[name] ?? 0);
    const fn = new Function(...allowedVariables, `return ${validation.cleaned};`);
    const result = fn(...args);
    if (typeof result !== 'number' || Number.isNaN(result)) {
      return { value: null, error: 'Výsledek není číslo.' };
    }
    return { value: result, error: null };
  } catch (error) {
    return { value: null, error: 'Výraz se nepodařilo vyhodnotit.' };
  }
};

const FormulaCard: React.FC<{ entry: FormulaEntry }> = ({ entry }) => {
  const initialValues = useMemo(
    () =>
      entry.variables.reduce<Record<string, number>>((acc, variable) => {
        acc[variable.id] = variable.defaultValue ?? 0;
        return acc;
      }, {}),
    [entry.variables],
  );
  const [values, setValues] = useState<Record<string, number>>(initialValues);
  const [expression, setExpression] = useState(entry.expression ?? '');

  const allowedVariables = entry.variables.map(variable => variable.id);
  const result = useMemo(
    () => evaluateExpression(expression, values, allowedVariables),
    [expression, values, allowedVariables],
  );

  return (
    <div className="border border-gray-200 rounded-2xl p-6 shadow-sm bg-white">
      <div className="flex flex-col gap-2 mb-4">
        <h3 className="text-xl font-semibold text-gray-900">{entry.name}</h3>
        {entry.description && (
          <p className="text-sm text-gray-600">{entry.description}</p>
        )}
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-700">
            Výraz
            <input
              value={expression}
              onChange={event => setExpression(event.target.value)}
              placeholder={entry.expressionPlaceholder ?? 'Zadejte výraz'}
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </label>
          <div className="space-y-2">
            {entry.variables.map(variable => (
              <label
                key={variable.id}
                className="flex items-center justify-between gap-3 text-sm text-gray-700"
              >
                <span>
                  {variable.label}
                  {variable.unit ? ` (${variable.unit})` : ''}
                </span>
                <input
                  type="number"
                  value={values[variable.id] ?? 0}
                  onChange={event =>
                    setValues(current => ({
                      ...current,
                      [variable.id]: Number(event.target.value),
                    }))
                  }
                  className="w-32 rounded-lg border border-gray-300 px-3 py-1 text-right text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </label>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-dashed border-indigo-200 bg-indigo-50 p-4 text-sm text-indigo-800">
          <p className="font-semibold text-indigo-900">Výsledek</p>
          {result.error ? (
            <p className="mt-2 text-indigo-700">{result.error}</p>
          ) : (
            <p className="mt-2 text-2xl font-bold text-indigo-900">
              {result.value?.toFixed(3)}
            </p>
          )}
          <p className="mt-3 text-xs text-indigo-700">
            Zadejte vzorec dle licencované normy a upravte proměnné. Výraz
            podporuje základní matematické operace.
          </p>
        </div>
      </div>
    </div>
  );
};

const FormulaSectionList: React.FC<{ sections: FormulaSection[] }> = ({ sections }) => (
  <div className="space-y-10">
    {sections.map(section => (
      <section key={section.id} className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
          {section.description && (
            <p className="mt-2 text-sm text-gray-600">{section.description}</p>
          )}
        </div>
        <div className="space-y-6">
          {section.entries.map(entry => (
            <FormulaCard key={entry.id} entry={entry} />
          ))}
        </div>
      </section>
    ))}
  </div>
);

export default FormulaSectionList;
