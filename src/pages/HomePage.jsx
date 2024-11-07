import React from "react";
import { Link } from "react-router-dom";
import HeroImage from "../assets/home-page-image-1.webp";
import AboutImage from "../assets/recovery-page-image.webp";
import { MdOutlineStar, MdPerson } from "react-icons/md";

const HomePage = () => {
  return (
    <>
      <main>
        <section className="flex justify-center items-center">
          <div className="wrapper flex items-center gap-32 pt-48 pb-32">
            <div className="flex-1">
              <h1 className="text-6xl font-bold uppercase mb-8">
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
          <h2 className="text-4xl uppercase mb-16">
            Believe Club de Benefícios
          </h2>
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-fit aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Logomarca
              </span>
              <h3 className="text-2xl font-normal">Lorem ipsum</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl">
              <span className="w-fit aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Logomarca
              </span>
              <h3 className="text-2xl font-normal">Lorem ipsum</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl">
              <span className="w-fit aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Logomarca
              </span>
              <h3 className="text-2xl font-normal">Lorem ipsum</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl">
              <span className="w-fit aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
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
                  <h3 className="flex items-center gap-3 text-xl font-medium mb-4">
                    <span className="w-3 h-3 rounded-full bg-accent"></span>
                    Comunidade Inspiradora
                  </h3>
                  <p>
                    Aqui, você encontrará apoio e incentivo, seja de nossos
                    treinadores dedicados ou dos colegas de treino que
                    compartilham da mesma paixão.
                  </p>
                </div>
                <div>
                  <h3 className="flex items-center gap-3 text-xl font-medium mb-4">
                    <span className="w-3 h-3 rounded-full bg-accent"></span>
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
              className="w-full max-h-[30rem] rounded-2xl"
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
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl">
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
                <div className="w-fit bg-neutral-700 p-4 rounded-md">
                  <MdPerson />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Nome do(a) Aluno(a)</span>
                  <span className="text-neutral-400">Aluno</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl">
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
                <div className="w-fit bg-neutral-700 p-4 rounded-md">
                  <MdPerson />
                </div>
                <div className="flex flex-col gap-1">
                  <span>Nome do(a) Aluno(a)</span>
                  <span className="text-neutral-400">Aluno</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl">
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
                <div className="w-fit bg-neutral-700 p-4 rounded-md">
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
            <div className="flex flex-col gap-4 h-[160px] card-glass border-opacity-20 p-8 rounded-2xl"></div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl"></div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl"></div>
            <div className="flex flex-col gap-4 card-glass border-opacity-20 p-8 rounded-2xl"></div>
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
            <h2 className="text-6xl font-bold uppercase mb-8">
              Comece agora sua jornada
            </h2>
            <p className="max-w-[60ch]">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum,
              repudiandae dolor aperiam molestias adipisci exercitationem,
              cupiditate quam alias blanditiis.
            </p>
          </div>
          <Link to="/contato" className="button shrink-0 text-2xl px-12 py-6">
            Entrar em Contato
          </Link>
        </section>
      </main>
    </>
  );
};

export default HomePage;
