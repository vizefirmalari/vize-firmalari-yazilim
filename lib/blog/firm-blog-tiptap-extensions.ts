import BulletList from "@tiptap/extension-bullet-list";
import Heading from "@tiptap/extension-heading";
import Link from "@tiptap/extension-link";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import Placeholder from "@tiptap/extension-placeholder";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

import { FirmBlogHorizontalRule } from "@/lib/blog/firm-blog-horizontal-rule";

export const StyledBulletList = BulletList.extend({
  addAttributes() {
    return {
      listStyle: {
        default: "disc",
        parseHTML: (element) => element.getAttribute("data-list-style") || "disc",
        renderHTML: (attributes) => {
          const v = String(attributes.listStyle || "disc");
          if (v === "check") {
            return {
              "data-list-style": "check",
              class: "vf-list-check",
              style: "list-style-type: none;",
            };
          }
          const safe = ["disc", "circle", "square"].includes(v) ? v : "disc";
          return {
            "data-list-style": safe,
            style: `list-style-type: ${safe};`,
          };
        },
      },
    };
  },
});

export function createFirmBlogRichTextExtensions(placeholder: string) {
  return [
    StarterKit.configure({
      heading: false,
      bulletList: false,
      orderedList: false,
      listItem: false,
      horizontalRule: false,
    }),
    FirmBlogHorizontalRule,
    Heading.configure({ levels: [2, 3] }),
    StyledBulletList,
    OrderedList,
    ListItem,
    Underline,
    Link.configure({ openOnClick: false }),
    Placeholder.configure({ placeholder }),
  ];
}
