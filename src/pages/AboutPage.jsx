import React from "react";
import { Link } from "react-router-dom";
import Image1 from "../assets/about-page-image-1.webp";
import Image2 from "../assets/about-page-image-2.webp";

const AboutPage = () => {
  return (
    <>
      <main>
        <section className="flex justify-center items-center">
          <div className="wrapper flex flex-col items-center justify-center pt-48 pb-32">
            <h1 className="max-w-[23ch] text-6xl font-bold uppercase text-center mb-8">
              <span className="italic text-accent">"</span>Focando no
              impossível, porque lá a concorrência é menor.
              <span className="italic text-accent">"</span>
            </h1>
            <p className="text-2xl italic mb-8">– Walt Disney</p>
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
              className="w-full max-h-[30rem] rounded-2xl"
            />
          </div>
        </section>
        <section className="wrapper pt-48">
          <div className="grid grid-cols-2 items-center gap-16">
            <img
              src={Image2}
              alt=""
              className="w-full max-h-[30rem] rounded-2xl"
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
            <div className="flex flex-col gap-2 card-glass border-opacity-20 p-8 rounded-2xl">
              <h3 className="text-2xl mb-4">Iniciante</h3>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet elit</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 card-glass border-opacity-20 p-8 rounded-2xl">
              <h3 className="text-2xl mb-4">Intermediário</h3>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet elit</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 card-glass border-opacity-20 p-8 rounded-2xl">
              <h3 className="text-2xl mb-4">Avançado</h3>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet consectetur</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 aspect-square rounded-full bg-accent"></span>
                <p>Lorem ipsum dolor sit amet elit</p>
              </div>
            </div>
          </div>
        </section>
        <section className="wrapper pt-48">
          <h2 className="text-6xl font-bold uppercase mb-16">Nossa equipe</h2>
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
            <div className="flex flex-col gap-4 card-glass p-8 rounded-2xl">
              <span className="w-full aspect-square flex items-center justify-center bg-neutral-900 p-2 rounded-md mb-4">
                Foto
              </span>
              <h3 className="text-xl font-normal">Nome do Treinador</h3>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
            </div>
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

export default AboutPage;
