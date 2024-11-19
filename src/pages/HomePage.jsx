import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/home-page-image-1.webp";
import AboutImage from "../assets/recovery-page-image.webp";
import { MdOutlineStar, MdPerson } from "react-icons/md";

const HomePage = () => {
  return (
    <>
      <main>
        <section className="flex items-center justify-center">
          <div className="wrapper flex items-center gap-32 pb-32 pt-48">
            <div className="flex-1">
              <h1 className="mb-8 text-6xl font-bold uppercase">
                O primeiro box de calistenia do Ceará
              </h1>
              <p className="mb-8">
                Na Believe, acreditamos que a verdadeira força vem de dentro.
                Junte-se a nós e descubra como a calistenia pode mudar sua vida,
                melhorando seu condicionamento físico, flexibilidade e
                confiança.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/contato" className="button">
                  Entrar em Contato
                </Link>
                <a href="#homePageAboutSection" className="button-ghost">
                  Saiba Mais
                </a>
              </div>
            </div>
            <div className="flex-1">
              <img src={HeroImage} alt="" className="rounded-2xl" />
            </div>
          </div>
        </section>
        <section className="wrapper">
          <h2 className="mb-16 text-4xl uppercase">
            Believe Club de Benefícios
          </h2>
          <div className="mb-8 grid grid-cols-4 gap-8">
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-fit items-center justify-center rounded-md bg-neutral-900 p-2">
                Logomarca
              </span>
              <h3 className="text-2xl font-normal">Lorem ipsum</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8">
              <span className="mb-4 flex aspect-square w-fit items-center justify-center rounded-md bg-neutral-900 p-2">
                Logomarca
              </span>
              <h3 className="text-2xl font-normal">Lorem ipsum</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8">
              <span className="mb-4 flex aspect-square w-fit items-center justify-center rounded-md bg-neutral-900 p-2">
                Logomarca
              </span>
              <h3 className="text-2xl font-normal">Lorem ipsum</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8">
              <span className="mb-4 flex aspect-square w-fit items-center justify-center rounded-md bg-neutral-900 p-2">
                Logomarca
              </span>
              <h3 className="text-2xl font-normal">Lorem ipsum</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <button className="button">Ver Todos</button>
        </section>
        <section className="wrapper pt-48" id="homePageAboutSection">
          <div className="grid grid-cols-2 items-center gap-16">
            <div className="flex flex-col gap-8">
              <h2 className="text-6xl font-bold uppercase">Quem somos</h2>
              <p>
                Na Believe, utilizamos técnicas comprovadas de calistenia que
                garantem resultados reais. Cada treino é projetado para desafiar
                e motivar, ajudando você a atingir seus objetivos de forma
                eficiente.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
                    <span className="h-3 w-3 rounded-full bg-accent"></span>
                    Comunidade Inspiradora
                  </h3>
                  <p>
                    Aqui, você encontrará apoio e incentivo, seja de nossos
                    treinadores dedicados ou dos colegas de treino que
                    compartilham da mesma paixão.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 flex items-center gap-3 text-xl font-medium">
                    <span className="h-3 w-3 rounded-full bg-accent"></span>
                    Comunidade Inspiradora
                  </h3>
                  <p>
                    Não importa se você é iniciante ou experiente, nossos
                    programas são adaptados para todos os níveis de habilidade.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link to="/contato" className="button">
                  Quero Fazer Parte
                </Link>
                <Link to="/sobre" className="button-ghost">
                  Saiba Mais
                </Link>
              </div>
            </div>
            <img
              src={AboutImage}
              alt=""
              className="max-h-[30rem] w-full rounded-2xl"
            />
          </div>
        </section>
        <section className="wrapper flex flex-col gap-8 pt-48">
          <h2 className="text-6xl font-bold uppercase">Depoimentos</h2>
          <p className="max-w-[60ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            velit ex, dignissimos corporis quisquam fugit necessitatibus totam.
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8">
              <div className="flex items-center gap-1">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit assumenda iure veritatis consequatur excepturi, odit
                voluptas quaerat expedita illum, voluptatibus doloribus
                perspiciatis commodi cumque aperiam in. Quos labore maxime ipsa?
              </p>
              <div className="flex items-center gap-4">
                <div className="w-fit rounded-md bg-neutral-700 p-4">
                  <MdPerson />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Nome do(a) Aluno(a)</span>
                  <span className="text-neutral-400">Aluno</span>
                </div>
              </div>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8">
              <div className="flex items-center gap-1">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit assumenda iure veritatis consequatur excepturi, odit
                voluptas quaerat expedita illum, voluptatibus doloribus
                perspiciatis commodi cumque aperiam in. Quos labore maxime ipsa?
              </p>
              <div className="flex items-center gap-4">
                <div className="w-fit rounded-md bg-neutral-700 p-4">
                  <MdPerson />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Nome do(a) Aluno(a)</span>
                  <span className="text-neutral-400">Aluno</span>
                </div>
              </div>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8">
              <div className="flex items-center gap-1">
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Suscipit assumenda iure veritatis consequatur excepturi, odit
                voluptas quaerat expedita illum, voluptatibus doloribus
                perspiciatis commodi cumque aperiam in. Quos labore maxime ipsa?
              </p>
              <div className="flex items-center gap-4">
                <div className="w-fit rounded-md bg-neutral-700 p-4">
                  <MdPerson />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Nome do(a) Aluno(a)</span>
                  <span className="text-neutral-400">Aluno</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="wrapper grid grid-cols-2 items-center gap-16 pt-48">
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
            <div className="card-glass flex h-[160px] flex-col gap-4 rounded-2xl border-opacity-20 p-8"></div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8"></div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8"></div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl border-opacity-20 p-8"></div>
          </div>
          <div className="flex flex-col gap-8">
            <h2 className="text-6xl font-bold uppercase">
              Conheça nossos produtos
            </h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
              pariatur, sapiente doloremque quaerat perferendis repellendus
              praesentium est delectus incidunt.
            </p>
            <Link className="button">Navegar</Link>
          </div>
        </section>
        <section className="wrapper flex items-center justify-between gap-16 py-32">
          <div>
            <h2 className="mb-8 text-6xl font-bold uppercase">
              Comece agora sua jornada
            </h2>
            <p className="max-w-[60ch]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              repudiandae dolor aperiam molestias adipisci exercitationem,
              cupiditate quam alias blanditiis.
            </p>
          </div>
          <Link to="/contato" className="button shrink-0 px-12 py-6 text-2xl">
            Entrar em Contato
          </Link>
        </section>
      </main>
    </>
  );
};

export default HomePage;
