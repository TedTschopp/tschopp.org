graph TD
  %% Generation 1
  Batk["Batk"]

  %% Generation 2
  Tamás1["Tamás"]
  Szeped["Szeped"]
  Merse["Merse"]
  Batk --> Tamás1
  Batk --> Szeped
  Batk --> Merse

  %% Generation 3 (children of Tamás I)
  Simon_Micz["Simon (Micz Bán)"]
  Bencze["Bencze"]
  András["András"]
  Tamás1 --> Simon_Micz
  Tamás1 --> Bencze
  Tamás1 --> András

  %% Generation 4 (children of Simon Micz Bán)
  Tamás_Csapi["Tamás de Csapi (fl. 1280s)"]
  Boksa["Boksa – anc. Szerdahelyi"]
  György["György Soós – anc. Soós"]
  Tamás_Szur["Tamás Szürtey – anc. Szürtey"]
  Simon_Jr["Simon (Jr.) Csapy"]
  Dénes["Dénes – anc. Bocskai"]
  Detre["Detre – anc. Szécsi"]
  Demeter["Demeter – anc. Kövesdi"]
  Daughter["Unnamed daughter (m. Tamás of Sebes)"]
  Simon_Micz --> Tamás_Csapi
  Simon_Micz --> Boksa
  Simon_Micz --> György
  Simon_Micz --> Tamás_Szur
  Simon_Micz --> Simon_Jr
  Simon_Micz --> Dénes
  Simon_Micz --> Detre
  Simon_Micz --> Demeter
  Simon_Micz --> Daughter

  %% Generation 5 (start of documented Csapy line)
  László_I["László I de Csapi (ispán of Zemplén)"]
  Tamás_Csapi --> László_I

  %% Generation 6
  Tamás_II_Dancs["Tamás II “Dancs” de Csapi (ispán)"]
  Miklós_I["Miklós I de Csapi (ispán of Sáros)"]
  János_I["János I de Csapi"]
  Mihály_I["Mihály I de Csapi → Szerdahelyi"]
  László_I --> Tamás_II_Dancs
  László_I --> Miklós_I
  László_I --> János_I
  László_I --> Mihály_I

  %% Generation 7
  András_Csapy["András Csapy (knighted 1418)"]
  Tamás_II_Dancs --> András_Csapy

  %% Generation 8
  László_II["László II de Csapi"]
  Miklós_II["Miklós II de Csapi"]
  János_II["János II de Csapi"]
  András_Csapy --> László_II
  András_Csapy --> Miklós_II
  András_Csapy --> János_II

  %% Generation 9 (late Csapy line)
  Farkas_Csapy["Farkas Csapy (loyalist 1530s)"]
  Miklós_II --> Farkas_Csapy

  Kristóf_Csapy["Kristóf Csapy (d. late 16th c.)"]
  Farkas_Csapy --> Kristóf_Csapy

  Zsuzsanna_Csapy["Zsuzsanna Csapy (m. Lónyai)"]
  Kristóf_Csapy --> Zsuzsanna_Csapy
