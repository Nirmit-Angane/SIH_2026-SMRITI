import { en, TranslationType } from "./en";
import { hi } from "./hi";
import { as } from "./as";
import { bn } from "./bn";
import { mni } from "./mni";
import { kha } from "./kha";
import { lus } from "./lus";
import { nag } from "./nag";
import { ne } from "./ne";
import { kok } from "./kok";
import { garo } from "./garo";
import { adi } from "./adi";
import { njo } from "./njo";
import { sip } from "./sip";
import { lep } from "./lep";

export const locales: Record<string, TranslationType> = {
  en,
  hi,
  as,
  bn,
  mni,
  kha,
  lus,
  nag,
  nagamese: nag,
  ne,
  kok,
  trp: kok,
  garo,
  adi,
  njo,
  sip,
  lep,
};

export type { TranslationType };
