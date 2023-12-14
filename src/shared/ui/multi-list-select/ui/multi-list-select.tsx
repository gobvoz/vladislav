import { SyntheticEvent, memo, useCallback, useEffect, useRef, useState } from 'react';

import cls from './multi-list-select.module.scss';
import { classNames } from 'shared/libs/class-names';

interface BaseElement {
  id: string;
  title: string;
}
/* eslint-disable-next-line @typescript-eslint/ban-types */
type Element<T = {}> = BaseElement & T;

interface Props<T extends Element> {
  className?: string;
  minimumChars?: number;
  placeholder?: string;

  currentList: T[];
  foundList: T[];

  getListBySearch: (searchString: string) => void;
  setSelectedElements: (elementList: T[]) => void;
}

const MultiListSelect = memo(<T extends Element>(props: Props<T>) => {
  const {
    className,
    minimumChars = 3,
    placeholder,
    currentList,
    foundList,
    getListBySearch,
    setSelectedElements,
  } = props;

  const [searchString, setSearchString] = useState<string>('');
  const [isMultiListFocused, setMultiListFocused] = useState(false);
  const [isMultiListSearching, setMultiListSearch] = useState(false);
  const [isMultiListSelecting, setMultiListSelecting] = useState(false);
  const multiListField = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMultiListSearch(false);
    setMultiListSelecting(true);
  }, [foundList]);

  const handleSearchStringChange = useCallback(
    (event: SyntheticEvent<HTMLInputElement>) => {
      const searchValue = event.currentTarget.value;

      setSearchString(searchValue);
      if (searchValue.length >= minimumChars) {
        setMultiListSearch(true);
        getListBySearch(searchValue);
      } else {
        setMultiListSelecting(false);
        setMultiListSearch(true);
      }
    },
    [minimumChars, getListBySearch],
  );

  const handleElementClick = useCallback(
    (id: string) => {
      const index = currentList.findIndex(element => element.id === id);

      if (index < 0) {
        setSelectedElements([...currentList, ...foundList.filter(element => element.id === id)]);
        return;
      }

      setSelectedElements([...currentList.slice(0, index), ...currentList.slice(index + 1)]);
      if (multiListField.current) multiListField.current.focus();
    },
    [currentList, foundList, setSelectedElements],
  );

  const handleMultiListFocus = useCallback(() => {
    setMultiListFocused(true);
    setMultiListSelecting(true);
    if (searchString.length <= minimumChars) {
      getListBySearch(searchString);
    }
  }, [minimumChars, searchString, getListBySearch]);

  const handleMultiListBlur = useCallback(
    (event: React.FocusEvent<HTMLElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as HTMLElement)) {
        // Not triggered when swapping focus between children
        setMultiListFocused(false);
        setMultiListSearch(false);
        setMultiListSelecting(false);
      }
    },
    [multiListField.current, searchString, getListBySearch],
  );

  const renderListOfCurrentElements = useCallback(
    (elementList: T[], onElementClick: (id: string) => void) => (
      <ul className={cls.currentList}>
        {elementList.map((element: T) => (
          <li className={cls.currentListElement} key={element.id}>
            <span className={cls.currentElementName}>
              <button
                className={cls.currentElementDelete}
                onClick={() => onElementClick(element.id)}></button>
              {element.title}
            </span>
          </li>
        ))}
      </ul>
    ),
    [],
  );

  const getSelectedClass = useCallback(
    (id: string, currentList: Element[]) => {
      const result = currentList.find(currentElement => currentElement.id === id);

      if (result) return cls.foundElementSelected;
    },
    [currentList],
  );

  const renderListOfFoundElements = useCallback(
    (elementsList: T[], currentList: T[], onElementClick: (id: string) => void) => {
      return (
        <ul className={cls.foundList}>
          {elementsList.map((element: T) => (
            <li
              className={classNames(cls.foundElement, getSelectedClass(element.id, currentList))}
              key={element.id}
              tabIndex={0}
              onClick={() => onElementClick(element.id)}>
              {element.title}
            </li>
          ))}
        </ul>
      );
    },
    [currentList, getSelectedClass],
  );

  const renderInfoString = useCallback(
    (
      searchString: string,
      isMultiListSearching: boolean,
      isMultiListSelecting: boolean,
      foundList: Element[],
    ) => {
      if (searchString.length < minimumChars) {
        return `Please enter ${minimumChars - searchString.length} or more characters`;
      }
      if (isMultiListSelecting && foundList.length === 0) {
        return `No matches found`;
      }
      if (isMultiListSearching) {
        return `Searching...`;
      }
      if (foundList.length > 0) {
        return `Found ${foundList.length} matches`;
      }

      return '';
    },
    [minimumChars],
  );

  return (
    <div
      className={classNames(cls.wrapper, className)}
      onFocus={handleMultiListFocus}
      onBlur={handleMultiListBlur}
      ref={multiListField}
      tabIndex={0}>
      <div
        className={classNames(cls.currentBody, { [cls.currentBodyFocused]: isMultiListFocused })}>
        {currentList.length ? renderListOfCurrentElements(currentList, handleElementClick) : null}
        <input
          className={cls.searchString}
          type="text"
          tabIndex={0}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
          spellCheck="false"
          aria-autocomplete="list"
          placeholder={placeholder || `Start type here...`}
          value={searchString}
          onChange={handleSearchStringChange}
        />
      </div>
      <div className={cls.infoBody}>
        {isMultiListFocused &&
        (searchString.length < minimumChars || isMultiListSearching || isMultiListSelecting) ? (
          <div className={cls.infoString}>
            {renderInfoString(searchString, isMultiListSearching, isMultiListSelecting, foundList)}

            {foundList.length && isMultiListSelecting
              ? renderListOfFoundElements(foundList, currentList, handleElementClick)
              : null}
          </div>
        ) : null}
      </div>
    </div>
  );
});

export { MultiListSelect };
