import { Intro } from './components/Intro';
import { Benefits } from './components/Benefits';
import { WhoWeAre } from './components/WhoWeAre';
import { Testimonials } from './components/Testimonials';
import { Products } from './components/Products';
import { Journey } from '../../components/Journey';

export function HomePage() {
  return (
    <>
      <main>
        <Intro />
        <Benefits />
        <WhoWeAre />
        <Testimonials />
        <Products />
        <Journey />
      </main>
    </>
  );
}
