import { SectionSearch } from './section-search';
import { SectionSort } from './section-sort';

type Props = {
  isSearchEnabled?: boolean;
  isSortEnabled?: boolean;
  sortOptions?: { value: string; label: string }[];
};

export function SectionSearchBar({ isSearchEnabled = true, isSortEnabled = true, sortOptions = [] }: Props) {
  if (!isSearchEnabled && !isSortEnabled) {
    return null;
  }
  return (
    <div className="flex flex-row items-center justify-between">
      <div className={'min-w-64'}>{isSearchEnabled && <SectionSearch />}</div>
      <div className={'min-w-64'}>
        {isSortEnabled && Array.isArray(sortOptions) && sortOptions.length > 0 && (
          <SectionSort sortOptions={sortOptions} />
        )}
      </div>
    </div>
  );
}
