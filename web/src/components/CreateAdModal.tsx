import { useState, useEffect, FormEvent } from 'react';

import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import axios from 'axios';

import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';

import { Input } from './Form/Input';

import { Game } from '../App';

export function CreateAdModal() {
  const [games, setGames] = useState<Game[]>([]);
  const [weekDays, setWeekDays] = useState<string[]>([]);
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false);
  const [selectedGameId, setSelectedGameId] = useState<string>('');

  useEffect(() => {
    axios('http://localhost:3333/games').then((response) =>
      setGames(response.data)
    );
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);
    const fieldsIsValid = Object.values(data).every((value) => value != '');
    const formIsValid = fieldsIsValid && selectedGameId && weekDays.length > 0;

    try {
      if (formIsValid) {
        await axios.post(`http://localhost:3333/games/${selectedGameId}/ads`, {
          name: data.name,
          yearsPlaying: Number(data.yearsPlaying),
          discord: data.discord,
          weekDays: weekDays,
          hourStart: String(data.hourStart),
          hourEnd: String(data.hourEnd),
          useVoiceChannel: useVoiceChannel,
        });
        alert('Enviado');
      } else {
        alert('Preencha todos os campos');
      }
    } catch (err) {
      console.log(err);
      alert('Erro ao enviar');
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/60 inset-0 fixed" />

      <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
        <Dialog.Title className="text-3xl font-black">
          Publique um anúncio
        </Dialog.Title>

        <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
          <section className="flex flex-col gap-2">
            <label htmlFor="game" className="font-semibold">
              Qual o game?
            </label>
            <Select.Root onValueChange={setSelectedGameId}>
              <Select.Trigger className="flex items-center justify-between bg-zinc-900 py-3 px-4 rounded text-sm">
                <Select.Value
                  placeholder="Selecione o game que deseja jogar"
                  className="text-red-200"
                />
                <Select.Icon>
                  <CaretDown className="w-6 h-6 text-zinc-400" />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-zinc-900 rounded text-sm mt-1 border  text-white border-zinc-600">
                  <Select.ScrollUpButton className="flex justify-center">
                    <CaretUp className="w-4 h-4 text-zinc-400" />
                  </Select.ScrollUpButton>

                  <Select.Viewport>
                    {games.map((game) => (
                      <Select.Item
                        key={game.id}
                        value={game.id}
                        className="flex gap-2 items-center hover:cursor-pointer py-3 px-4 hover:bg-zinc-800 transition-colors"
                      >
                        <Select.ItemText>{game.title}</Select.ItemText>
                        <Select.ItemIndicator>
                          <Check className="w-4 h-4 text-zinc-400" />
                        </Select.ItemIndicator>
                      </Select.Item>
                    ))}
                  </Select.Viewport>

                  <Select.ScrollDownButton className="flex justify-center">
                    <CaretDown className="w-4 h-4 text-zinc-400" />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </section>

          <section className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold">
              Seu nome (ou nickname)
            </label>
            <Input
              name="name"
              id="name"
              type="text"
              placeholder="Como te chamam dentro do game?"
            />
          </section>

          <section className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="yearsPlaying" className="font-semibold">
                Joga há quantos anos?
              </label>
              <Input
                name="yearsPlaying"
                id="yearsPlaying"
                type="number"
                placeholder="Tudo bem ser ZERO"
                min={0}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="discord" className="font-semibold">
                Qual seu Discord?
              </label>
              <Input
                name="discord"
                id="discord"
                type="text"
                placeholder="Usuário#0000"
              />
            </div>
          </section>

          <section className="flex gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="weekDays" className="font-semibold">
                Quando costuma jogar?
              </label>

              <ToggleGroup.Root
                type="multiple"
                className="grid grid-cols-4 gap-2"
                value={weekDays}
                onValueChange={(value) => setWeekDays(value)}
              >
                <ToggleGroup.Item
                  value="0"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Domingo"
                >
                  D
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="1"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Segunda"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="2"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Terça"
                >
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="3"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Quarta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="4"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Quinta"
                >
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="5"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Sexta"
                >
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  value="6"
                  className={`w-8 h-8 rounded ${
                    weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'
                  }`}
                  title="Sábado"
                >
                  S
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>

            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="hourStart" className="font-semibold">
                Qual horário do dia?
              </label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="time"
                  name="hourStart"
                  id="hourStart"
                  placeholder="De"
                />
                <Input
                  type="time"
                  name="hourEnd"
                  id="hourEnd"
                  placeholder="Até"
                />
              </div>
            </div>
          </section>

          <label className="mt-2 flex items-center gap-2 text-sm">
            <Checkbox.Root
              checked={useVoiceChannel}
              onCheckedChange={(checked) => {
                if (checked === true) {
                  setUseVoiceChannel(true);
                } else {
                  setUseVoiceChannel(false);
                }
              }}
              className="w-6 h-6 flex items-center justify-center rounded bg-zinc-900"
            >
              <Checkbox.Indicator>
                <Check className="w-4 h-4 text-emerald-400" />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>

          <footer className="mt-4 flex justify-end gap-4">
            <Dialog.Close
              type="button"
              className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600"
            >
              Cancelar
            </Dialog.Close>
            <button
              type="submit"
              className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
            >
              <GameController size={24} />
              Encontrar duo
            </button>
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
