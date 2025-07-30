export default function getPaginationRange(
  currentPage: number,
  totalPages: number,
  siblings: number = 1
): (number | "dots")[] {
  const totalPageNumbers = siblings * 2 + 5;
  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }
  const leftSiblingIndex = Math.max(currentPage - siblings, 1);
  const rightSiblingIndex = Math.min(currentPage + siblings, totalPages);
  const showLeftDots = leftSiblingIndex > 2;
  const showRightDots = rightSiblingIndex < totalPages - 1;
  let range: (number | "dots")[] = [];
  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + 2 * siblings }, (_, i) => i + 1);
    range = [...leftRange, "dots", totalPages];
  } else if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + 2 * siblings },
      (_, i) => totalPages - (3 + 2 * siblings) + i + 1
    );
    range = [1, "dots", ...rightRange];
  } else if (showLeftDots && showRightDots) {
    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i
    );
    range = [1, "dots", ...middleRange, "dots", totalPages];
  }
  return range;
}
