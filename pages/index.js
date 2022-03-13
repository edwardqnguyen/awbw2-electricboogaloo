import Link from 'next/link';
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
        <img src="/Logo.png"/>
        <ul>
          <li>
            <Link href="/damageCalculator">Damage Calculator</Link>
          </li>
          <li>
            <Link href="/unitDamageChart">Damage Chart</Link>
          </li>
          <li>
            <Link href="/coDamageChart">CO Atk/Def Modifiers</Link>
          </li>
          <li>
            <Link href="/mapDemo">Map Demo</Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
