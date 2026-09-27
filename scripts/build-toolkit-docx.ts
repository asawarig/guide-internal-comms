// Build script — generates the downloadable toolkit .docx from src/content/guide.ts.
// Run with: node --experimental-strip-types scripts/build-toolkit-docx.ts
// (or via `npm run build:toolkit` — see package.json)

import {
  AlignmentType,
  Document,
  Footer,
  HeadingLevel,
  LevelFormat,
  Packer,
  PageBreak,
  Paragraph,
  TextRun,
} from "docx";
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { intro, meta, parts, sources } from "../src/content/guide.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const OUTPUT = join(__dirname, "..", "public", meta.toolkitFileName);

const CORAL = "FF5A3C";
const DEEP_PURPLE = "2B1D4A";
const INK = "211636";

function heading(text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel]) {
  return new Paragraph({
    heading: level,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        color: DEEP_PURPLE,
      }),
    ],
  });
}

function body(text: string) {
  return new Paragraph({
    spacing: { after: 120, line: 320 },
    children: [new TextRun({ text, color: INK, size: 22 })],
  });
}

function subhead(text: string) {
  return new Paragraph({
    spacing: { before: 200, after: 80 },
    children: [
      new TextRun({
        text,
        color: CORAL,
        bold: true,
        size: 20,
        allCaps: true,
      }),
    ],
  });
}

function checklist(items: string[]) {
  return items.map(
    (item) =>
      new Paragraph({
        numbering: { reference: "toolkit-check", level: 0 },
        spacing: { after: 60 },
        children: [new TextRun({ text: item, color: INK, size: 22 })],
      })
  );
}

function callout(label: string, text: string) {
  return [
    new Paragraph({
      spacing: { before: 160, after: 40 },
      children: [
        new TextRun({ text: label, color: CORAL, bold: true, size: 18, allCaps: true }),
      ],
    }),
    new Paragraph({
      spacing: { after: 160 },
      children: [new TextRun({ text, color: INK, italics: true, size: 22 })],
    }),
  ];
}

function divider() {
  return new Paragraph({
    border: {
      bottom: { style: "single", size: 6, color: "D9CFB5", space: 8 },
    },
    spacing: { before: 240, after: 240 },
    children: [],
  });
}

function bandRow(band: { label: string; range: string; body: string }) {
  return new Paragraph({
    spacing: { after: 100 },
    children: [
      new TextRun({ text: `${band.label} · `, bold: true, color: DEEP_PURPLE, size: 22 }),
      new TextRun({ text: band.range, color: CORAL, size: 20, italics: true }),
      new TextRun({ text: ` ${band.body}`, color: INK, size: 22, break: 1 }),
    ],
  });
}

const children: Paragraph[] = [];

// Cover
children.push(
  new Paragraph({
    alignment: AlignmentType.LEFT,
    spacing: { before: 400, after: 200 },
    children: [
      new TextRun({
        text: "PLUM · GUIDE · INTERNAL COMMS",
        color: CORAL,
        bold: true,
        size: 20,
        allCaps: true,
      }),
    ],
  }),
  new Paragraph({
    heading: HeadingLevel.TITLE,
    spacing: { after: 240 },
    children: [
      new TextRun({
        text: meta.title,
        color: DEEP_PURPLE,
        bold: true,
        size: 48,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 400 },
    children: [
      new TextRun({
        text: meta.tagline,
        color: INK,
        size: 26,
        italics: true,
      }),
    ],
  }),
  new Paragraph({
    spacing: { after: 400 },
    children: [
      new TextRun({
        text:
          "This toolkit gathers every checklist, script, template, and playbook from the guide into one document you can edit, share, or print.",
        color: INK,
        size: 22,
      }),
    ],
  }),
  new Paragraph({ children: [new PageBreak()] })
);

// Why this guide
children.push(heading("Why this guide exists", HeadingLevel.HEADING_1));
for (const p of intro.paragraphs) {
  children.push(body(p));
}
children.push(new Paragraph({ children: [new PageBreak()] }));

// Sections
parts.forEach((part, partIdx) => {
  children.push(
    heading(`Part ${part.romanNumeral} — ${part.title}`, HeadingLevel.HEADING_1),
    body(part.blurb),
    divider()
  );
  part.sections.forEach((section) => {
    children.push(
      heading(`${section.number}. ${section.title}`, HeadingLevel.HEADING_2),
      subhead("Why it matters"),
      body(section.why),
      subhead("What good looks like"),
      body(section.whatGood),
      subhead("By team size")
    );
    section.bands.forEach((b) => children.push(bandRow(b)));
    children.push(subhead("Common mistake"), body(section.mistake));

    children.push(subhead(`Take this with you — ${section.takeAwayTitle}`));
    for (const block of section.takeAwayBlocks) {
      children.push(
        new Paragraph({
          spacing: { before: 160, after: 60 },
          children: [
            new TextRun({
              text: block.subheading,
              color: DEEP_PURPLE,
              bold: true,
              size: 24,
            }),
          ],
        })
      );
      if (block.intro) {
        children.push(
          new Paragraph({
            spacing: { after: 100 },
            children: [
              new TextRun({ text: block.intro, color: INK, italics: true, size: 22 }),
            ],
          })
        );
      }
      if (block.items) {
        children.push(...checklist(block.items));
      }
    }

    children.push(...callout("Editor's note", section.editorsNote));
    children.push(divider());
  });
  if (partIdx < parts.length - 1) {
    children.push(new Paragraph({ children: [new PageBreak()] }));
  }
});

// Sources
children.push(new Paragraph({ children: [new PageBreak()] }));
children.push(heading("Sources", HeadingLevel.HEADING_1));
for (const s of sources) {
  children.push(
    new Paragraph({
      spacing: { after: 100 },
      children: [
        new TextRun({ text: `${s.label}. `, bold: true, color: DEEP_PURPLE, size: 22 }),
        new TextRun({ text: s.detail, color: INK, size: 22 }),
      ],
    })
  );
}

const doc = new Document({
  creator: meta.publisher,
  title: meta.title,
  description: meta.tagline,
  styles: {
    default: {
      document: {
        run: { font: "Calibri" },
      },
    },
  },
  numbering: {
    config: [
      {
        reference: "toolkit-check",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "□",
            alignment: AlignmentType.LEFT,
            style: {
              paragraph: { indent: { left: 360, hanging: 240 } },
              run: { color: CORAL },
            },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          margin: { top: 1080, bottom: 1080, left: 1080, right: 1080 },
        },
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: `${meta.title} · ${meta.publisher}`,
                  color: "8A7BAF",
                  size: 18,
                  italics: true,
                }),
              ],
            }),
          ],
        }),
      },
      children,
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
writeFileSync(OUTPUT, buffer);
console.log(`Wrote ${OUTPUT} (${buffer.byteLength.toLocaleString()} bytes)`);
