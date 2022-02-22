import DamageCalc from '../src/pages/damageCalculator.js';
/**
 * Root of application, currently set to damage calculator
 * as part of milestone 1
 * @return {div} Homepage div
 */
export default function Home() {
  return (
    <div>
      <main>
        <h1>
                Advance Wars By Web 2: Electric Boogaloo Project
        </h1>
      </main>
      <DamageCalc/>
    </div>
  );
}
