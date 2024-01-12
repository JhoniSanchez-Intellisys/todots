import React, { useEffect, useRef, useState } from "react";
import { api } from "../api/api";
import { ISt, ITask } from "../interfaces/interface";

const Task: React.FC<ISt> = ({ iid }) => {
  const [data, setdata] = useState<ITask[]>([]);
  const [form, setform] = useState<string>("");
  const [select, setselect] = useState(false);
  const [ids, setid] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const req = async () => {
    const res = await api();
    console.log(res);
    setdata(res);
  };

  const getId = (id: number) => {
    setid(id);

    // const task = data.filter((el) => el.id == id);
    const taskindex = data.findIndex((el) => el.id == id);

    const modificado = [...data];
    console.log(modificado);
    const mod = (modificado[taskindex].title = form);
    console.log(mod.length);

    // const title = task[0].title;
    // setform(title);
    // console.log(task);

    // setdata(mod);
    // del(id);
    setselect(true);
  };

  const add = () => {
    if (select === true) {
      const id = iid();
      setdata([
        {
          userId: 200,
          id: id,
          title: form,
          completed: false,
        },
        ...data,
      ]);
      setform("");
      setselect(false);
    } else {
      setform("");
      setselect(false);
    }
  };

  const del = (id: number) => {
    const proc = data?.filter((el) => el.id !== id);
    setdata(proc);
  };

  useEffect(() => {
    req();

    console.log(form);
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [form]);

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setform(e.target.value)}
        value={form}
        ref={inputRef}
      />
      <button onClick={() => add()}>{!select ? "Agregar" : "Guardar"}</button>

      {data &&
        data.map((el) => {
          return (
            <div key={el.id}>
              <h3>{el.title}</h3>
              <span>
                <button onClick={() => del(el.id)}>Eliminar</button>
                <button onClick={() => getId(el.id)}>Editar</button>
              </span>
            </div>
          );
        })}
    </div>
  );
};

export default Task;
