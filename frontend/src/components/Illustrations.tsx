import { useId } from "react";

export function CleaningScene({ clean = true }: { clean?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      className="cleaning-scene"
      viewBox="0 0 660 570"
      role="img"
      aria-label="Объёмная иллюстрация: мастер в зелёной форме чистит ковёр экстрактором"
    >
      <defs>
        <linearGradient id={`${id}-carpet`} x1="0" y1="0" x2=".8" y2="1">
          <stop stopColor="#f5e9ce" />
          <stop offset="1" stopColor="#cfc29e" />
        </linearGradient>
        <linearGradient id={`${id}-green`} x1="0" x2="1" y1="0" y2=".5">
          <stop stopColor="#87b997" />
          <stop offset=".4" stopColor="#528665" />
          <stop offset="1" stopColor="#2e5943" />
        </linearGradient>
        <linearGradient id={`${id}-pants`}>
          <stop stopColor="#315c48" />
          <stop offset=".5" stopColor="#46775b" />
          <stop offset="1" stopColor="#244b38" />
        </linearGradient>
        <linearGradient id={`${id}-skin`}>
          <stop stopColor="#f4d0aa" />
          <stop offset=".55" stopColor="#e8b78f" />
          <stop offset="1" stopColor="#c68d66" />
        </linearGradient>
        <linearGradient id={`${id}-metal`}>
          <stop stopColor="#7b8988" />
          <stop offset=".3" stopColor="#eef4ef" />
          <stop offset=".6" stopColor="#c2cbc4" />
          <stop offset="1" stopColor="#627c70" />
        </linearGradient>
        <linearGradient id={`${id}-white`} x2=".7" y2="1">
          <stop stopColor="#fffef8" />
          <stop offset="1" stopColor="#d3d9ce" />
        </linearGradient>
        <radialGradient id={`${id}-bubble`} cx=".3" cy=".25">
          <stop stopColor="#fff" stopOpacity=".95" />
          <stop offset=".4" stopColor="#fafff9" stopOpacity=".2" />
          <stop offset=".85" stopColor="#bbd6c1" stopOpacity=".3" />
          <stop offset="1" stopColor="#fff" stopOpacity=".8" />
        </radialGradient>
        <filter id={`${id}-shadow`} x="-40%" y="-40%" width="190%" height="200%">
          <feDropShadow dx="0" dy="15" stdDeviation="12" floodColor="#314d36" floodOpacity=".15" />
        </filter>
        <filter id={`${id}-blur`}>
          <feGaussianBlur stdDeviation="13" />
        </filter>
        <pattern id={`${id}-pile`} width="7" height="7" patternUnits="userSpaceOnUse">
          <path d="m1 5 1-2m2 4 1-3" stroke="#fff" strokeOpacity=".22" strokeWidth="1" />
        </pattern>
        <clipPath id={`${id}-rugclip`}>
          <path d="M76 348 333 248Q345 244 357 252L570 374Q583 383 568 392L311 529Q298 537 283 529L76 371Q58 359 76 348Z" />
        </clipPath>
      </defs>
      <ellipse
        cx="330"
        cy="443"
        rx="249"
        ry="56"
        fill="#6a8b66"
        opacity=".12"
        filter={`url(#${id}-blur)`}
      />
      <g filter={`url(#${id}-shadow)`}>
        <path d="m71 361 213 176q13 9 30 0l261-143v-14L306 518 71 349Z" fill="#b8a880" />
        <g stroke="#d0c09c" strokeWidth="2.3" strokeLinecap="round">
          {Array.from({ length: 30 }, (_, i) => (
            <path key={i} d={`m${83 + i * 7.3} ${372 + i * 5.5} -11 8`} />
          ))}
          {Array.from({ length: 34 }, (_, i) => (
            <path key={`b${i}`} d={`m${319 + i * 7.2} ${527 - i * 3.9} 2 11`} />
          ))}
        </g>
        <path
          d="M76 348 333 248Q345 244 357 252L570 374Q583 383 568 392L311 529Q298 537 283 529L76 371Q58 359 76 348Z"
          fill={`url(#${id}-carpet)`}
        />
        <g clipPath={`url(#${id}-rugclip)`}>
          <path
            d="M107 344c63-48 82 65 147 32s43-136 131-120l90 56c-69-30-92 117-183 116S175 360 107 393Z"
            fill="#a4b59a"
            opacity=".86"
          />
          <path
            d="M187 455c74-75 130 7 221-69 35-30 52-49 103-43l32 21c-55-12-71 32-106 66-74 73-127 2-181 77Z"
            fill="#f8f2e0"
          />
          <path d="M69 359 576 383M301 535l46-284" stroke="#d7cbaa" strokeWidth="1" opacity=".4" />
          <rect x="60" y="243" width="530" height="300" fill={`url(#${id}-pile)`} />
          <g className={`scene-stains ${clean ? "is-clean" : ""}`} fill="#8d7252">
            <ellipse
              cx="203"
              cy="389"
              rx="29"
              ry="12"
              transform="rotate(22 203 389)"
              opacity=".45"
            />
            <ellipse
              cx="275"
              cy="458"
              rx="37"
              ry="16"
              transform="rotate(20 275 458)"
              opacity=".3"
            />
            <ellipse cx="371" cy="388" rx="24" ry="11" opacity=".3" />
            <circle cx="235" cy="412" r="5" opacity=".4" />
            <circle cx="183" cy="407" r="4" opacity=".4" />
            <circle cx="320" cy="437" r="6" opacity=".25" />
          </g>
        </g>
      </g>
      <g className="scene-machine" filter={`url(#${id}-shadow)`}>
        <ellipse cx="531" cy="392" rx="48" ry="16" fill="#345a42" opacity=".16" />
        <circle cx="501" cy="380" r="13" fill="#293e31" />
        <circle cx="552" cy="386" r="14" fill="#253d2e" />
        <circle cx="552" cy="386" r="6" fill="#7c9483" />
        <path d="M491 316q41-24 77 4v52q-3 24-41 20-32-3-36-22Z" fill={`url(#${id}-green)`} />
        <ellipse cx="529" cy="317" rx="39" ry="16" fill="#9ab69b" />
        <path d="M492 319v19q37 22 74 3v-20q-36 17-74-2Z" fill={`url(#${id}-white)`} />
        <path
          d="M504 308v-23q24-16 49 2v23"
          fill="none"
          stroke="#345d43"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <ellipse cx="528" cy="307" rx="24" ry="8" fill="#457653" />
        <rect x="523" y="343" width="15" height="25" rx="7" fill="#b9d2b3" />
        <circle cx="530.5" cy="350" r="3" fill="#5c8c5a" />
        <path
          d="M498 348c-17-4-20-13-30-32-15-29-48-21-49 1"
          stroke="#293f31"
          strokeWidth="15"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M498 346c-17-4-20-13-30-32-15-29-48-21-49 1"
          stroke="#536750"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
      <g className="scene-person" filter={`url(#${id}-shadow)`}>
        <path
          d="m320 266-18 65 2 30"
          stroke={`url(#${id}-pants)`}
          strokeWidth="33"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="m350 266 21 42 18 22"
          stroke={`url(#${id}-pants)`}
          strokeWidth="33"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M288 353q12-11 27-3l6 17q-3 10-18 8l-22-6q-10-8 7-16Z" fill="#e4e7d9" />
        <path d="M280 368q13 9 34 7" stroke="#b5bca9" strokeWidth="4" strokeLinecap="round" />
        <path d="M379 322q12-7 23 4l20 16q4 9-10 12l-27-5q-12-9-6-27Z" fill="#e7e9de" />
        <path d="M382 345q20 13 38 4" stroke="#b5bca9" strokeWidth="4" strokeLinecap="round" />
        <path
          d="M313 185q25-18 49-4 20 14 17 47l-9 44q-24 20-64 2l-5-47q-6-28 12-42Z"
          fill={`url(#${id}-green)`}
        />
        <path
          d="m323 183-2 54 40 2 7-49"
          stroke="#b4c5a4"
          strokeWidth="5"
          fill="none"
          opacity=".65"
        />
        <path d="M322 224h34v27q-17 10-34-1Z" fill="#446f50" />
        <path d="M325 227h27" stroke="#91b18c" strokeWidth="2" />
        <path d="M326 182v-23h29v24q-15 13-29 0Z" fill={`url(#${id}-skin)`} />
        <path
          d="M319 126q6-20 29-13 24 6 22 27l-2 20q-4 20-21 18-20-4-25-20Z"
          fill={`url(#${id}-skin)`}
        />
        <ellipse cx="322" cy="147" rx="7" ry="10" fill="#e8ba94" />
        <path d="M358 144q14 7 13 13l-9 3" fill="#d7a47c" />
        <path
          d="M354 161q5 4 9 0"
          fill="none"
          stroke="#a07553"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <ellipse cx="357" cy="143" rx="2" ry="3" fill="#3c3c2c" />
        <path d="M317 138q-13-27 13-35 29-9 40 16l-1 17q-21-8-38-2l-2 17-8-4Z" fill="#664d37" />
        <path d="M313 124q-8-33 28-34 33 0 33 36l-30-5Z" fill={`url(#${id}-green)`} />
        <path d="M313 123q30-10 59 2l12 9q-20 8-44-1l-27-1Z" fill="#3f6e4c" />
        <path
          d="m309 206-24 32 29 27"
          stroke={`url(#${id}-green)`}
          strokeWidth="24"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="m304 255 30 15"
          stroke={`url(#${id}-skin)`}
          strokeWidth="19"
          strokeLinecap="round"
        />
        <path
          d="m367 205 25 35"
          stroke={`url(#${id}-green)`}
          strokeWidth="27"
          strokeLinecap="round"
        />
        <path
          d="m393 238 38 22"
          stroke={`url(#${id}-skin)`}
          strokeWidth="20"
          strokeLinecap="round"
        />
      </g>
      <g className="scene-wand">
        <path d="m395 238 54 130" stroke="#7c8d7d" strokeWidth="9" strokeLinecap="round" />
        <path
          d="m394 238 53 126"
          stroke={`url(#${id}-metal)`}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <path
          d="m387 231 25-8 9 21"
          fill="none"
          stroke="#3f5844"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="m333 272 45-15 18-20"
          stroke={`url(#${id}-skin)`}
          strokeWidth="17"
          fill="none"
          strokeLinecap="round"
        />
        <path d="m429 258 8 5" stroke="#ebbd92" strokeWidth="21" strokeLinecap="round" />
        <path d="m446 357-22 18 44 31 24-14-31-29Z" fill="#bfc9b9" />
        <path d="m424 375 44 31v8l-45-30Z" fill="#7d9380" />
        <path d="m468 406 24-14v8l-24 14Z" fill="#506d53" />
        <path d="m435 376 32 23" stroke="#f9fff2" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g className={`scene-foam ${clean ? "is-clean" : ""}`} fill="#fffdf3" opacity=".9">
        {[
          [406, 388, 10],
          [419, 397, 12],
          [437, 410, 9],
          [406, 405, 8],
          [390, 397, 6],
          [454, 422, 7],
          [430, 421, 5],
          [397, 418, 4],
        ].map(([cx, cy, r], i) => (
          <circle key={i} cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <g fill={`url(#${id}-bubble)`} stroke="#e9f1e5" strokeWidth="1">
        <circle className="bubble bubble-one" cx="187" cy="215" r="23" />
        <circle className="bubble bubble-two" cx="476" cy="173" r="16" />
        <circle className="bubble bubble-three" cx="224" cy="146" r="10" />
        <circle cx="543" cy="242" r="8" />
        <circle cx="138" cy="300" r="6" />
      </g>
      <g fill="#6f9b70">
        <path d="m215 287 3-11 3 11 11 3-11 3-3 11-3-11-11-3Z" />
        <path d="m477 448 3-13 3 13 13 3-13 3-3 13-3-13-13-3Z" />
        <path d="m421 117 2-7 2 7 7 2-7 2-2 7-2-7-7-2Z" />
      </g>
    </svg>
  );
}

export function RugVisual({ dirt = 0, compact = false }: { dirt?: number; compact?: boolean }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 480 310"
      className={compact ? "rug-visual compact" : "rug-visual"}
      role="img"
      aria-label={`Ковёр, степень загрязнения ${dirt}%`}
    >
      <defs>
        <linearGradient id={`${id}rug`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#f2e6cd" />
          <stop offset="1" stopColor="#dbcfb4" />
        </linearGradient>
        <linearGradient id={`${id}roll`}>
          <stop stopColor="#b5a789" />
          <stop offset=".25" stopColor="#f8edcf" />
          <stop offset=".7" stopColor="#ddd0b0" />
          <stop offset="1" stopColor="#bcb397" />
        </linearGradient>
        <filter id={`${id}blur`}>
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <pattern id={`${id}texture`} width="5" height="5" patternUnits="userSpaceOnUse">
          <path d="m1 4 1-2m2 1 1-2" stroke="#fff" opacity=".35" strokeWidth=".7" />
        </pattern>
        <clipPath id={`${id}clip`}>
          <path d="m63 153 203-96 159 107-202 113Z" />
        </clipPath>
      </defs>
      <ellipse
        cx="245"
        cy="243"
        rx="153"
        ry="23"
        fill="#59725c"
        opacity=".17"
        filter={`url(#${id}blur)`}
      />
      <path d="m63 153 160 131 202-112v-9L223 271 63 148Z" fill="#bfb092" />
      <path d="m63 153 203-96 159 107-202 113Z" fill={`url(#${id}rug)`} />
      <g clipPath={`url(#${id}clip)`}>
        <path
          d="M57 157c103-85 113 42 179 7s45-96 108-79l32 31c-53-13-36 73-122 93S135 115 80 193Z"
          fill="#9eaf91"
        />
        <path
          d="M141 242c66-80 134 13 211-84 16-20 41-17 71-13l-4 26c-60-13-53 84-132 73s-80 1-104 25Z"
          fill="#f9f3df"
        />
        <path d="m58 153 208-94 160 105-203 113Z" fill={`url(#${id}texture)`} />
        <g className="dirt-patches" style={{ opacity: dirt / 100 }}>
          <ellipse
            cx="195"
            cy="174"
            rx="35"
            ry="13"
            fill="#786449"
            transform="rotate(15 195 174)"
          />
          <ellipse
            cx="276"
            cy="209"
            rx="32"
            ry="15"
            fill="#8f7050"
            transform="rotate(-15 276 209)"
          />
          <ellipse cx="295" cy="123" rx="21" ry="10" fill="#89704b" />
          <circle cx="210" cy="205" r="5" fill="#806448" />
          <circle cx="167" cy="182" r="4" fill="#806448" />
          <circle cx="334" cy="180" r="7" fill="#7d664b" />
          <path
            d="M100 165q51 35 84 24"
            stroke="#766748"
            strokeWidth="9"
            opacity=".45"
            fill="none"
          />
        </g>
      </g>
      <g stroke="#d0c09b" strokeWidth="1.7" strokeLinecap="round">
        {Array.from({ length: 25 }, (_, i) => (
          <path key={i} d={`m${68 + i * 6.3} ${159 + i * 4.9} -7 6`} />
        ))}
      </g>
      <path d="m63 153 202-96q-6-27-29-18L42 129q-15 18 21 24Z" fill={`url(#${id}roll)`} />
      <ellipse cx="54" cy="140" rx="12" ry="17" transform="rotate(-47 54 140)" fill="#c3b494" />
      <ellipse cx="54" cy="140" rx="6" ry="10" transform="rotate(-47 54 140)" fill="#978e74" />
      <path d="m66 133 190-87" stroke="#fff7df" strokeWidth="2" opacity=".6" />
    </svg>
  );
}

export function MattressVisual() {
  const id = useId().replace(/:/g, "");
  return (
    <svg
      viewBox="0 0 480 310"
      role="img"
      aria-label="Чистый объёмный матрас"
      className="mattress-visual"
    >
      <defs>
        <linearGradient id={`${id}top`} x2="1" y2="1">
          <stop stopColor="#fffefa" />
          <stop offset="1" stopColor="#e5e1dc" />
        </linearGradient>
        <linearGradient id={`${id}side`} x2="0" y2="1">
          <stop stopColor="#dedbd6" />
          <stop offset=".5" stopColor="#f8f5ef" />
          <stop offset="1" stopColor="#c7c6bc" />
        </linearGradient>
        <filter id={`${id}s`}>
          <feDropShadow dx="0" dy="18" stdDeviation="13" floodColor="#6b7162" floodOpacity=".2" />
        </filter>
      </defs>
      <g filter={`url(#${id}s)`}>
        <path
          d="M65 165v37q0 10 11 15l140 66q11 5 24-2l174-102q10-6 10-16v-33Z"
          fill={`url(#${id}side)`}
        />
        <path
          d="m72 153 176-93q11-5 22 0l147 69q16 9 1 18L239 249q-11 6-22 0L73 177q-17-12-1-24Z"
          fill={`url(#${id}top)`}
        />
        <path d="m71 182 145 72q12 7 24 0l175-102" fill="none" stroke="#cacbc1" strokeWidth="2" />
        <path d="m72 200 145 73q12 6 24-1l175-102" fill="none" stroke="#b7baae" strokeWidth="1.5" />
        {Array.from({ length: 5 }, (_, i) => (
          <path
            key={i}
            d={`m${102 + i * 29} ${145 - i * 15} 144 71`}
            stroke="#d2d1c6"
            strokeWidth="1"
            opacity=".8"
          />
        ))}
        {Array.from({ length: 5 }, (_, i) => (
          <path
            key={i}
            d={`m${102 + i * 28} ${187 + i * 14} 173-95`}
            stroke="#d2d1c6"
            strokeWidth="1"
            opacity=".8"
          />
        ))}
        {Array.from({ length: 4 }, (_, i) =>
          Array.from({ length: 4 }, (_, j) => (
            <ellipse
              key={`${i}-${j}`}
              cx={135 + i * 29 + j * 29}
              cy={148 + i * 14 - j * 15}
              rx="2.5"
              ry="1.5"
              fill="#c3c4b8"
            />
          )),
        )}
        <path d="m298 238 29-17v13l-29 16Z" fill="#8f9c86" />
      </g>
    </svg>
  );
}
