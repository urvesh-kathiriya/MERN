import React, { useContext, useState } from 'react';
import { AdminUserContext } from '../../store/AdminUserStore';
import { ArrowLeftFromLine } from 'lucide-react';

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      tabIndex={0}
      role="button"
      aria-roledescription="draggable"
      aria-label={`Draggable item ${id}`}
    >
      {children}
    </div>
  );
};

const AddNewUser = () => {
  const { ActiveAddToNewUser, handleAddUser } = useContext(AdminUserContext);
  const [selectedOption, setSelectedOption] = useState('User');
  const [selectedItem, setSelectedItem] = useState([]);
  const dataObj = {};
  const [items] = useState([
    'User_name',
    'Email',
    'Password',
    'Number',
    'IsAdmin'
  ]);

  const handleItemClick = (item) => {
    if (item === 'clear') {
      setSelectedItem([]);
      return;
    }
    if (!selectedItem.includes(item)) {
      setSelectedItem((prev) => [...prev, item]);
    }
  };

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmitAddUser = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    selectedItem.forEach((item) => {
      if (item === 'IsAdmin') {
        const role = formData.get('isAdmin');
        dataObj.isAdmin = role === 'Admin';
      } else {
        dataObj[item] = formData.get(item);
      }
    });
    handleAddUser(dataObj);
  };


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 10 },
    }),

    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );


  return (
    <div>
      <button
        onClick={() => ActiveAddToNewUser(false)}
        className="flex mt-3 bg-gradient-to-b from-green-900 via-teal-700 to-amber-600 text-transparent bg-clip-text"
      >
        <ArrowLeftFromLine className="w-8 h-8 mr-1 text-amber-500" />
        <p className="tracking-wider text-2xl">Go Back</p>
      </button>

      <h1 className="text-4xl tracking-wider flex justify-center items-center bg-gradient-to-b from-indigo-900 via-purple-700 to-pink-600 text-transparent bg-clip-text font-bold mt-3">
        Add New User
      </h1>

      <div className="border-2 border-gray-500 mt-3 rounded-lg grid grid-cols-4">
        {/* Left Field Selector */}
        <div className="border-r-2 border-gray-500">
          <div className="m-3 p-3">
            {items.map((item) => (
              <div
                key={item}
                className="bg-gray-800 text-amber-400 text-2xl font-bold flex justify-center items-center m-3 border-1 border-gray-500 shadow-2xl shadow-pink-700"
              >
                <button onClick={() => handleItemClick(item)}>{item}</button>
              </div>
            ))}
            <div className="text-2xl font-bold m-3 text-black bg-red-700 flex justify-center items-center shadow-2xl shadow-red-800">
              <button onClick={() => handleItemClick('clear')}>Clear All</button>
            </div>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="col-span-3">
          <form onSubmit={handleSubmitAddUser}>
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={({ active, over }) => {
                if (active.id !== over?.id) {
                  const oldIndex = selectedItem.indexOf(active.id);
                  const newIndex = selectedItem.indexOf(over.id);
                  setSelectedItem((items) => arrayMove(items, oldIndex, newIndex));
                }
              }}
            >
              <SortableContext items={selectedItem} strategy={verticalListSortingStrategy}>
                {selectedItem.map((item) => (
                  <SortableItem key={item} id={item}>
                    <div className="m-3 border-1 border-gray-500 bg-gray-900 rounded-lg p-2">
                      <p className="m-3 p-3 border-b-2 font-bold text-xl font-sans tracking-[0.1rem]">{item}</p>
                      {item === 'IsAdmin' ? (
                        <div className="flex gap-4 m-3">
                          <div>
                            <input
                              type="radio"
                              id="Admin"
                              name="isAdmin"
                              value="Admin"
                              checked={selectedOption === 'Admin'}
                              onChange={handleRadioChange}
                            />
                            <label htmlFor="Admin" className="tracking-widest m-3 text-amber-400">
                              ADMIN
                            </label>
                          </div>
                          <div>
                            <input
                              type="radio"
                              id="User"
                              name="isAdmin"
                              value="User"
                              checked={selectedOption === 'User'}
                              onChange={handleRadioChange}
                            />
                            <label htmlFor="User" className="tracking-widest m-3 text-amber-400">
                              User
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className="flex justify-center items-center">
                          <input
                            type={
                              item === 'Password'
                                ? 'password'
                                : item === 'Number'
                                  ? 'tel'
                                  : item === 'Email'
                                    ? 'email'
                                    : 'text'
                            }
                            id={item}
                            name={item}
                            placeholder={`Enter The ${item.toUpperCase()} !`}
                            className="py-3 m-3 px-3 text-amber-400 rounded-lg border border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition duration-500 ease-in-out focus:outline-none mt-2 w-full"
                            required

                            pattern={item === 'Number' ? '[0-9]{10}' : undefined}
                          />
                        </div>
                      )}
                    </div>
                  </SortableItem>
                ))}
              </SortableContext>
            </DndContext>

            {selectedItem.length > 0 && (
              <div className="flex justify-center items-center p-5 m-5">
                <button
                  disabled={selectedItem.length < 5}
                  className="border-1 border-y-cyan-700 bg-gradient-to-b from-green-900 via-teal-700 to-amber-600 text-transparent bg-clip-text p-2 rounded-lg tracking-wider text-xl"
                >
                  Add New User
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewUser;
