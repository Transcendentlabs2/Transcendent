export type ReferenceGuide = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  excerpt: string;
  primaryKeyword: string;
  supportingKeywords: string[];
  publishedAt: string;
  updatedAt: string;
  sections: Array<{
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }>;
  related: string[];
};

export const REFERENCE_GUIDES: ReferenceGuide[] = [
  {
    slug: "peptide-synthesis-overview",
    title: "Peptide Synthesis: A Laboratory Overview",
    seoTitle: "Peptide Synthesis Explained: Laboratory Overview",
    description: "A laboratory-focused overview of peptide synthesis, chain assembly, deprotection, cleavage, purification, and analytical characterization.",
    excerpt: "How peptide chains are assembled and why synthesis is only the first step in producing a well-characterized research material.",
    primaryKeyword: "peptide synthesis",
    supportingKeywords: ["how peptides are synthesized", "peptide synthesis process", "research peptide synthesis"],
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    sections: [
      {
        heading: "From amino acids to a defined sequence",
        paragraphs: [
          "Peptide synthesis is the controlled formation of amide bonds between amino-acid residues in a specified order. The analytical objective is not simply to create a chain of the correct nominal length, but to produce material whose identity and composition can be characterized after synthesis.",
          "Modern research peptides are commonly assembled stepwise. Each cycle introduces a protected amino acid, forms a new peptide bond, and prepares the growing chain for the next coupling step. Sequence length and residue chemistry influence the difficulty of the synthesis and the number of potential side products."
        ]
      },
      {
        heading: "Why protecting groups matter",
        paragraphs: [
          "Amino acids contain multiple reactive functional groups. Protecting-group chemistry temporarily blocks reactions at positions that should remain unchanged during a given coupling step. Selective protection and deprotection allow the synthesis to proceed in a controlled direction.",
          "Incomplete deprotection or coupling can produce deletion sequences or other related species. That is one reason downstream purification and analytical testing are essential rather than optional extensions of the synthesis process."
        ]
      },
      {
        heading: "Cleavage, purification, and characterization",
        paragraphs: [
          "After chain assembly, the peptide is released from the synthesis support and protecting groups are removed under defined conditions. The crude material can contain the intended peptide together with truncated sequences, protecting-group remnants, reagents, and other synthesis-related components.",
          "Purification is used to separate the target material from detectable related species. Analytical HPLC can then characterize chromatographic composition, while mass spectrometry can provide complementary evidence that the observed molecular mass is consistent with the intended sequence."
        ],
        bullets: [
          "Synthesis creates the candidate peptide material.",
          "Purification separates the target from detectable related components.",
          "HPLC characterizes chromatographic composition under a defined method.",
          "Mass spectrometry provides complementary molecular-mass evidence.",
          "Lot documentation connects the analytical record to the material used in research."
        ]
      },
      {
        heading: "Why synthesis quality should be evaluated through evidence",
        paragraphs: [
          "A synthesis method alone does not establish final batch quality. Researchers benefit from reviewing the evidence attached to the specific lot, including sample identifiers, chromatographic data, molecular-mass data when available, and handling documentation.",
          "Transcendent Labs presents research materials for laboratory use only. Public educational content focuses on analytical evidence, documentation, and traceability rather than human-use claims."
        ]
      }
    ],
    related: ["solid-phase-peptide-synthesis", "peptide-purification", "batch-traceability"]
  },
  {
    slug: "solid-phase-peptide-synthesis",
    title: "Solid-Phase Peptide Synthesis (SPPS): How the Workflow Works",
    seoTitle: "Solid-Phase Peptide Synthesis (SPPS) Explained",
    description: "Understand the core SPPS workflow, resin-bound chain assembly, coupling cycles, deprotection, cleavage, and analytical limitations.",
    excerpt: "A practical explanation of resin-bound peptide chain assembly and the evidence required after synthesis.",
    primaryKeyword: "solid phase peptide synthesis",
    supportingKeywords: ["SPPS peptide synthesis", "solid phase peptide synthesis steps", "peptide synthesis resin"],
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    sections: [
      {
        heading: "What SPPS changes about peptide assembly",
        paragraphs: [
          "Solid-phase peptide synthesis attaches the growing peptide chain to an insoluble support, commonly called a resin. Reagents can be added, allowed to react, and then washed away while the peptide remains attached to the solid phase.",
          "This architecture makes repetitive coupling cycles practical because excess soluble reagents can be removed between steps without isolating the growing peptide after every reaction."
        ]
      },
      {
        heading: "A typical synthesis cycle",
        paragraphs: [
          "A simplified SPPS cycle includes removal of a temporary protecting group, washing, activation of the next amino acid, coupling to the resin-bound chain, and additional washing before the next cycle. The sequence is extended one residue at a time.",
          "Reaction efficiency matters because a small incomplete-coupling fraction can accumulate across a long sequence. Repeated or optimized coupling steps may be used when steric or chemical factors make a residue difficult to incorporate."
        ],
        bullets: ["Deprotection", "Wash", "Amino-acid activation", "Coupling", "Wash", "Repeat for the next residue"]
      },
      {
        heading: "Cleavage does not equal final purity",
        paragraphs: [
          "When assembly is complete, cleavage conditions release the peptide from the resin and remove appropriate side-chain protecting groups. The resulting crude product can still contain synthesis-related species and therefore normally requires purification before analytical characterization.",
          "The existence of an SPPS workflow should not be confused with evidence of a specific purity value. Final claims should be supported by lot-specific analytical records."
        ]
      },
      {
        heading: "Analytical follow-through",
        paragraphs: [
          "A strong documentation chain connects synthesis, purification, sample identity, and final testing. HPLC and mass spectrometry answer different analytical questions and are most useful when their records are traceable to the exact batch under review."
        ]
      }
    ],
    related: ["peptide-synthesis-overview", "peptide-purification", "hplc-vs-mass-spectrometry"]
  },
  {
    slug: "peptide-purification",
    title: "Peptide Purification: Why Crude Synthesis Is Not the Final Material",
    seoTitle: "Peptide Purification Explained for Laboratory Research",
    description: "Learn why crude peptide synthesis contains related species, how chromatographic purification separates components, and why final testing still matters.",
    excerpt: "The role of purification between peptide synthesis and final analytical characterization.",
    primaryKeyword: "peptide purification",
    supportingKeywords: ["peptide purification HPLC", "purifying synthetic peptides", "peptide chromatography purification"],
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    sections: [
      {
        heading: "Why crude peptide mixtures exist",
        paragraphs: [
          "Stepwise synthesis can generate deletion sequences, incompletely deprotected species, side-reaction products, and other components in addition to the intended peptide. Cleavage also introduces a chemical environment that must be separated from the desired material.",
          "For this reason, crude synthesis yield and final analytical purity are different concepts. A large amount of crude material does not imply that the target peptide represents the same fraction of the mixture."
        ]
      },
      {
        heading: "Chromatographic separation",
        paragraphs: [
          "Preparative chromatography can separate components according to differences in chemical behavior under a defined method. Reversed-phase systems are commonly used for peptides because related species can differ sufficiently in hydrophobic behavior to elute at different times.",
          "Fractions associated with the target are collected and may be combined after analytical review. The purified material can then be converted into a suitable final form, such as a lyophilized solid."
        ]
      },
      {
        heading: "Purification and analytical HPLC are related but different",
        paragraphs: [
          "Preparative chromatography is used to isolate material at a useful scale. Analytical HPLC uses smaller samples and is optimized to characterize the chromatographic profile of the resulting batch. A purification run therefore should not replace the final analytical record.",
          "Researchers reviewing a batch should distinguish between evidence showing that a purification step occurred and evidence describing the composition of the final material."
        ]
      },
      {
        heading: "Documentation after purification",
        paragraphs: [
          "The final record is stronger when the purified lot, analytical sample name, chromatogram, molecular-mass evidence, and certificate all share consistent identifiers. Traceability turns separate laboratory outputs into a connected evidence chain."
        ]
      }
    ],
    related: ["peptide-synthesis-overview", "hplc-vs-mass-spectrometry", "batch-traceability"]
  },
  {
    slug: "hplc-vs-mass-spectrometry",
    title: "HPLC vs Mass Spectrometry for Peptide Analysis",
    seoTitle: "HPLC vs Mass Spectrometry for Peptide Testing",
    description: "Compare HPLC and mass spectrometry in peptide analysis, including what each method measures, where each has limits, and why they are complementary.",
    excerpt: "Two analytical techniques, two different questions: chromatographic composition and molecular-mass evidence.",
    primaryKeyword: "HPLC vs mass spectrometry peptides",
    supportingKeywords: ["HPLC vs MS peptide testing", "peptide HPLC mass spectrometry", "peptide identity purity testing"],
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    sections: [
      {
        heading: "HPLC asks a separation question",
        paragraphs: [
          "High-performance liquid chromatography separates detectable sample components under a defined chromatographic method. The output is a chromatogram showing detector response over retention time.",
          "For peptide materials, HPLC is commonly used to characterize whether one component dominates the chromatographic profile and to report integrated peak-area percentages. Those percentages are method-dependent and should be interpreted with the underlying chromatogram."
        ]
      },
      {
        heading: "Mass spectrometry asks a mass-to-charge question",
        paragraphs: [
          "Mass spectrometry measures ion signals by mass-to-charge ratio. For peptides, observed signals can be compared with theoretical values derived from the expected molecular composition.",
          "The technique supports identity assessment, but interpretation depends on charge state, ionization, adducts, instrument configuration, and the molecular species expected under the method."
        ]
      },
      {
        heading: "Why neither result should substitute for the other",
        paragraphs: [
          "A dominant chromatographic peak does not independently prove that the component has the expected molecular identity. Conversely, observing an expected mass-related ion does not by itself describe all detectable components in the sample.",
          "Combining chromatographic and mass-spectrometric evidence creates a more informative analytical picture because the techniques address different dimensions of the material."
        ]
      },
      {
        heading: "What researchers should compare across records",
        paragraphs: [
          "Method outputs become substantially more useful when sample names and lot numbers agree across the chromatogram, spectrum, certificate, and vial. Consistent identifiers make it possible to determine whether complementary tests actually describe the same batch."
        ],
        bullets: ["Lot and sample identifier", "Analysis date", "Reported method", "Displayed raw or processed output", "Result summary", "Consistency across documents"]
      }
    ],
    related: ["peptide-purification", "batch-traceability", "peptide-storage-handling"]
  },
  {
    slug: "batch-traceability",
    title: "Peptide Batch Traceability: Connecting the Vial, COA, and Analytical Record",
    seoTitle: "Peptide Batch Traceability and Lot Documentation Guide",
    description: "Learn how lot numbers connect peptide vials, certificates, chromatograms, spectra, and analytical dates into a traceable research record.",
    excerpt: "Why consistent lot identifiers are the backbone of useful analytical documentation.",
    primaryKeyword: "peptide batch traceability",
    supportingKeywords: ["peptide lot verification", "peptide batch COA", "peptide analytical traceability"],
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    sections: [
      {
        heading: "Traceability is an evidence relationship",
        paragraphs: [
          "Batch traceability means that a researcher can connect the physical material to the documentation that describes it. The lot number is the primary linking identifier, but effective traceability also depends on matching sample names, dates, and analytical records.",
          "A certificate that cannot be connected to the delivered lot is weaker evidence than a certificate whose identifiers match the vial and supporting analytical files."
        ]
      },
      {
        heading: "The minimum traceability chain",
        paragraphs: [
          "A practical research record should make the relationship between material and analysis explicit. The same lot should remain identifiable from receipt through experimental use."
        ],
        bullets: ["Product name", "Lot or batch number", "Analytical sample identifier", "Analysis date", "COA or result record", "Storage and handling record"]
      },
      {
        heading: "Common breaks in the chain",
        paragraphs: [
          "Traceability can fail when a certificate contains no lot number, an attached chromatogram uses an unrelated sample name, or a downloadable file is reused without identifying the batch it represents. These gaps make otherwise polished documentation difficult to verify.",
          "Researchers should also distinguish supplier-issued summaries from independent laboratory records when the source of testing is material to procurement decisions."
        ]
      },
      {
        heading: "Why public lot lookup can help",
        paragraphs: [
          "A public batch-verification system can reduce ambiguity by providing one destination where a lot number connects to the analytical documentation intentionally published for that material. The system is only as credible as the evidence behind each record, so unpublished or unverified records should not be presented as verified."
        ]
      }
    ],
    related: ["hplc-vs-mass-spectrometry", "peptide-synthesis-overview", "peptide-storage-handling"]
  },
  {
    slug: "peptide-storage-handling",
    title: "Peptide Storage and Handling for Laboratory Research Materials",
    seoTitle: "Peptide Storage and Handling: Laboratory Research Guide",
    description: "A research-focused overview of peptide storage variables, moisture, temperature, light, handling records, and stability documentation.",
    excerpt: "Storage is part of sample integrity: how environment and handling records affect the usefulness of analytical evidence.",
    primaryKeyword: "peptide storage",
    supportingKeywords: ["how to store research peptides", "lyophilized peptide storage", "peptide stability storage"],
    publishedAt: "2026-08-29",
    updatedAt: "2026-08-29",
    sections: [
      {
        heading: "Storage is part of the experimental record",
        paragraphs: [
          "Analytical characterization describes a material at a particular point in time. Storage and handling after that analysis can affect whether the material remains representative of the documented state when it is later used in research.",
          "The relevant conditions depend on peptide chemistry, formulation, packaging, and the stability information available for the material. Researchers should rely on product-specific documentation rather than treating one storage rule as universally applicable."
        ]
      },
      {
        heading: "Variables that can affect peptide integrity",
        paragraphs: [
          "Temperature, moisture, light, oxygen exposure, repeated environmental cycling, and container integrity can all be relevant to peptide stability. Some sequences are particularly sensitive to oxidation, hydrolysis, aggregation, or other degradation pathways.",
          "Lyophilization can improve practical stability by removing water from the material, but a lyophilized state does not make a peptide immune to environmental exposure."
        ],
        bullets: ["Temperature", "Humidity and moisture exposure", "Light exposure", "Oxygen exposure", "Container closure integrity", "Number of handling cycles"]
      },
      {
        heading: "Handling records improve reproducibility",
        paragraphs: [
          "For important experiments, researchers benefit from documenting receipt date, lot number, storage location, relevant temperature conditions, and preparation or transfer events. These records help separate material-history questions from experimental variables when interpreting results."
        ]
      },
      {
        heading: "Connect storage guidance to lot documentation",
        paragraphs: [
          "A strong quality system connects the material, batch record, analytical documentation, and handling instructions. When product-specific stability evidence is unavailable, documentation should communicate that limitation rather than imply unsupported certainty."
        ]
      }
    ],
    related: ["batch-traceability", "peptide-purification", "hplc-vs-mass-spectrometry"]
  }
];

export function findReferenceGuide(slug: string) {
  return REFERENCE_GUIDES.find((guide) => guide.slug === slug) ?? null;
}
