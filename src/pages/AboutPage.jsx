import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../assets/about-page-image-1.webp";
import Image2 from "../assets/about-page-image-2.webp";

const AboutPage = () => {
  return (
    <>
      <main>
        <section className="flex items-center justify-center">
          <div className="wrapper flex flex-col items-center justify-center pb-32 pt-48">
            <h1 className="mb-8 max-w-[23ch] text-center text-6xl font-bold uppercase">
              <span className="italic text-accent">"</span>Focando no
              impossível, porque lá a concorrência é menor.
              <span className="italic text-accent">"</span>
            </h1>
            <p className="mb-8 text-2xl italic">– Walt Disney</p>
          </div>
        </section>
        <section className="wrapper">
          <div className="grid grid-cols-2 items-center gap-16">
            <div className="flex flex-col gap-8">
              <h2 className="text-6xl font-bold uppercase">Quem somos</h2>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                eos earum ab obcaecati sint maxime deserunt explicabo deleniti
                pariatur sed iure atque nobis quia autem velit ipsa esse,
                consectetur sequi?
              </p>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                eos earum ab obcaecati sint maxime deserunt explicabo deleniti
                pariatur sed iure atque nobis quia autem velit ipsa esse,
                consectetur sequi?
              </p>
            </div>
            <img
              src={Image1}
              alt=""
              className="max-h-[30rem] w-full rounded-2xl"
            />
          </div>
        </section>
        <section className="wrapper pt-48">
          <div className="grid grid-cols-2 items-center gap-16">
            <img
              src={Image2}
              alt=""
              className="max-h-[30rem] w-full rounded-2xl"
            />
            <div className="flex flex-col gap-8">
              <h2 className="text-6xl font-bold uppercase">
                Comunidade inspiradora
              </h2>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                eos earum ab obcaecati sint maxime deserunt explicabo deleniti
                pariatur sed iure atque nobis quia autem velit ipsa esse,
                consectetur sequi?
              </p>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
                eos earum ab obcaecati sint maxime deserunt explicabo deleniti
                pariatur sed iure atque nobis quia autem velit ipsa esse,
                consectetur sequi?
              </p>
            </div>
          </div>
        </section>
        <section className="wrapper flex flex-col gap-8 pt-48">
          <h2 className="text-6xl font-bold uppercase">Para todos os níveis</h2>
          <p className="max-w-[60ch]">
            Não importa se você é iniciante ou experiente, nossos programas são
            adaptados para todos os níveis de habilidade.
          </p>
          <div className="grid grid-cols-3 gap-8">
            <div className="card-glass flex flex-col gap-2 rounded-2xl border-opacity-20 p-8">
              <h3 className="mb-4 text-2xl">Iniciante</h3>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet elit</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>
            <div className="card-glass flex flex-col gap-2 rounded-2xl border-opacity-20 p-8">
              <h3 className="mb-4 text-2xl">Intermediário</h3>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet elit</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
            </div>
            <div className="card-glass flex flex-col gap-2 rounded-2xl border-opacity-20 p-8">
              <h3 className="mb-4 text-2xl">Avançado</h3>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="aspect-square h-3 w-3 rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet elit</p>
              </div>
            </div>
          </div>
        </section>
        <section className="wrapper pt-48">
          <h2 className="mb-16 text-6xl font-bold uppercase">Nossa equipe</h2>
          <div className="mb-8 grid grid-cols-4 gap-8">
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="card-glass flex flex-col gap-4 rounded-2xl p-8">
              <span className="mb-4 flex aspect-square w-full items-center justify-center rounded-md bg-neutral-900 p-2">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
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

export default AboutPage;
