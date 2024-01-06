import GithubSlugger from 'github-slugger';

export interface Heading {
  text: string;
  slug: string;
  level: number;
  index: number;
  children: Heading[];
}

const slugger = new GithubSlugger();
const createHeading = (
  text: string,
  level: number,
  index: number,
): Heading => ({
  text,
  slug: slugger.slug(text),
  level,
  children: [],
  index,
});

const insertHeading = (
  headings: Heading[],
  heading: Heading,
  level: number,
): Heading[] => {
  if (headings.length === 0) {
    return [heading];
  }

  const last = headings[headings.length - 1];

  if (level > last.level) {
    if (!last.children) {
      last.children = [];
    }
    last.children = insertHeading(last.children, heading, level);
    return headings;
  }

  return [...headings, heading];
};

export const getHeadings = (source: string): Heading[] => {
  const regex = /^(#+) (.+)$/gm;

  return Array.from(source.matchAll(regex)).reduce(
    (
      acc,
      [
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        _,
        hashes,
        text,
      ],
      index,
    ) => {
      const level = hashes.length;
      const heading = createHeading(text, level, index);
      return insertHeading(acc, heading, level);
    },
    [] as Heading[],
  );
};
