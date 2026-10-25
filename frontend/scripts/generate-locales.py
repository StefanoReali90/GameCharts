"""Generate complete UI locale JSON files from compact, reviewed phrase groups."""
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1] / 'src' / 'i18n'
english = json.loads((root / 'en.json').read_text(encoding='utf-8'))
groups = {
    'nav': list(english)[:8],
    'settings': list(english)[8:19],
    'leaderboard': list(english)[19:38],
    'profile': list(english)[38:41],
    'history': list(english)[41:62],
    'cards': list(english)[62:69],
}

footers = {
    'es': 'La Spezia | En línea', 'fr': 'La Spezia | En ligne',
    'de': 'La Spezia | Online', 'pt': 'La Spezia | Online',
    'zh': '拉斯佩齐亚 | 在线', 'hi': 'ला स्पेज़िया | ऑनलाइन',
    'ar': 'لا سبيتسيا | متصل', 'bn': 'লা স্পেজিয়া | অনলাইন',
    'ru': 'Ла Специя | Онлайн', 'id': 'La Spezia | Daring',
    'ur': 'لا سپیزیا | آن لائن', 'ja': 'ラ・スペツィア | オンライン',
    'mr': 'ला स्पेझिया | ऑनलाइन', 'vi': 'La Spezia | Trực tuyến',
    'te': 'లా స్పెజియా | ఆన్‌లైన్', 'ha': 'La Spezia | Kan layi',
    'tr': 'La Spezia | Çevrimiçi', 'ko': '라스페치아 | 온라인',
    'ro': 'La Spezia | Online',
}

extra_keys = list(english)[70:]
extra_keys = [key for key in extra_keys if key != 'leaderboard.cancel']
extras = {
    'es': 'Buscar jugador por nombre|Buscar|Ordenar {column} {direction}|ascendente|descendente',
    'fr': 'Rechercher un joueur par nom|Rechercher|Trier {column} par ordre {direction}|croissant|décroissant',
    'de': 'Spieler nach Namen suchen|Suchen|{column} {direction} sortieren|aufsteigend|absteigend',
    'pt': 'Buscar jogador por nome|Buscar|Ordenar {column} de forma {direction}|crescente|decrescente',
    'zh': '按姓名搜索玩家|搜索|按{column}{direction}排序|升序|降序',
    'hi': 'नाम से खिलाड़ी खोजें|खोजें|{column} को {direction} क्रम में लगाएँ|आरोही|अवरोही',
    'ar': 'ابحث عن لاعب بالاسم|بحث|رتّب {column} {direction}|تصاعديًا|تنازليًا',
    'bn': 'নাম দিয়ে খেলোয়াড় খুঁজুন|খুঁজুন|{column} {direction} ক্রমে সাজান|ঊর্ধ্বক্রমে|নিম্নক্রমে',
    'ru': 'Поиск игрока по имени|Найти|Сортировать {column} {direction}|по возрастанию|по убыванию',
    'id': 'Cari pemain berdasarkan nama|Cari|Urutkan {column} secara {direction}|menaik|menurun',
    'ur': 'نام سے کھلاڑی تلاش کریں|تلاش کریں|{column} کو {direction} ترتیب دیں|صعودی|نزولی',
    'ja': '名前でプレイヤーを検索|検索|{column}を{direction}で並べ替え|昇順|降順',
    'mr': 'नावाने खेळाडू शोधा|शोधा|{column} {direction} क्रमाने लावा|चढता|उतरता',
    'vi': 'Tìm người chơi theo tên|Tìm|Sắp xếp {column} {direction}|tăng dần|giảm dần',
    'te': 'పేరుతో ఆటగాడిని వెతకండి|వెతకండి|{column} ను {direction} క్రమంలో అమర్చండి|ఆరోహణ|అవరోహణ',
    'ha': 'Nemi ɗan wasa da suna|Nema|Jera {column} {direction}|na hawa|na sauka',
    'tr': 'Oyuncuyu adına göre ara|Ara|{column} için {direction} sırala|artan|azalan',
    'ko': '이름으로 플레이어 검색|검색|{column} {direction} 정렬|오름차순|내림차순',
    'ro': 'Caută jucător după nume|Caută|Sortează {column} {direction}|crescător|descrescător',
}

cancels = {
    'es': 'Cancelar', 'fr': 'Annuler', 'de': 'Abbrechen', 'pt': 'Cancelar',
    'zh': '取消', 'hi': 'रद्द करें', 'ar': 'إلغاء', 'bn': 'বাতিল',
    'ru': 'Отмена', 'id': 'Batal', 'ur': 'منسوخ کریں', 'ja': 'キャンセル',
    'mr': 'रद्द करा', 'vi': 'Hủy', 'te': 'రద్దు చేయండి', 'ha': 'Soke',
    'tr': 'İptal', 'ko': '취소', 'ro': 'Anulează',
}

# Each pipe-separated group follows the key order in en.json. Keep {placeholders} unchanged.
packs = {
    'es': {
        'nav': 'La Spezia - Clasificación|Navegación principal|Páginas|Clasificación|Historial de partidas|Configuración|Abrir barra lateral|Cerrar barra lateral',
        'settings': 'Configuración|Audio|Efectos de sonido|Música de fondo|Idioma|Elige el idioma de la interfaz.|Guardar|Restablecer la configuración predeterminada|Restablece el audio y el idioma: efectos 67 %, música 4 %, inglés.|La configuración ya tiene los valores predeterminados.|Cerrar',
        'leaderboard': 'Clasificación|Resultados|Expandir tabla|Contraer tabla|Clasificación de jugadores|Podio de los tres mejores jugadores|Puesto {rank}|{count} victorias|victoria|victorias|Racha {count} · Récord {score}|En espera|Pos.|Jugador|Victorias|Racha de victorias|Mejor total|No hay más jugadores en la clasificación|No hay resultados para estos filtros',
        'profile': 'Foto de perfil de {name}: {cards}|Foto de perfil de {name}|Puntuaciones: {scores}',
        'history': 'Historial de partidas|Añadir partida|Separa las puntuaciones con comas. La fecha se establece automáticamente al guardar.|Ganador|Puntuaciones|Selecciona un jugador|Guardar partida|Partida registrada. Clasificación y rachas actualizadas.|Selecciona un jugador válido.|Introduce una o más puntuaciones enteras separadas por comas.|Período|Todo el tiempo|Último año|Últimos 6 meses|Últimos 30 días|Ordenar de {from} a {to}|más antiguo|más reciente|Fecha|No se encontraron partidas con estos filtros|Jugador desconocido',
        'cards': 'Comodín|As de picas|{rank} de picas|Rey de corazones|Reina de picas|Sota de tréboles|Puntuación {score}',
    },
    'fr': {
        'nav': 'La Spezia - Classement|Navigation principale|Pages|Classement|Historique des parties|Paramètres|Ouvrir la barre latérale|Fermer la barre latérale',
        'settings': 'Paramètres|Audio|Effets sonores|Musique de fond|Langue|Choisissez la langue de l’interface.|Enregistrer|Rétablir les paramètres par défaut|Rétablit l’audio et la langue : effets 67 %, musique 4 %, anglais.|Les paramètres sont déjà aux valeurs par défaut.|Fermer',
        'leaderboard': 'Classement|Résultats|Développer le tableau|Réduire le tableau|Classement des joueurs|Podium des trois meilleurs joueurs|{rank}e place|{count} victoires|victoire|victoires|Série {count} · Record {score}|En attente|Pos.|Joueur|Victoires|Série de victoires|Meilleur total|Aucun autre joueur dans le classement|Aucun résultat pour ces filtres',
        'profile': 'Photo de profil de {name} : {cards}|Photo de profil de {name}|Scores : {scores}',
        'history': 'Historique des parties|Ajouter une partie|Séparez les scores par des virgules. La date est définie automatiquement à l’enregistrement.|Vainqueur|Scores|Sélectionnez un joueur|Enregistrer la partie|Partie enregistrée. Classement et séries mis à jour.|Sélectionnez un joueur valide.|Saisissez un ou plusieurs scores entiers séparés par des virgules.|Période|Depuis toujours|Dernière année|6 derniers mois|30 derniers jours|Trier de {from} à {to}|plus ancien|plus récent|Date|Aucune partie trouvée avec ces filtres|Joueur inconnu',
        'cards': 'Joker|As de pique|{rank} de pique|Roi de cœur|Dame de pique|Valet de trèfle|Score {score}',
    },
    'de': {
        'nav': 'La Spezia - Rangliste|Hauptnavigation|Seiten|Rangliste|Spielverlauf|Einstellungen|Seitenleiste öffnen|Seitenleiste schließen',
        'settings': 'Einstellungen|Audio|Soundeffekte|Hintergrundmusik|Sprache|Wähle die Sprache der Benutzeroberfläche.|Speichern|Standardeinstellungen wiederherstellen|Setzt Audio und Sprache zurück: Effekte 67 %, Musik 4 %, Englisch.|Die Einstellungen entsprechen bereits den Standardwerten.|Schließen',
        'leaderboard': 'Rangliste|Ergebnisse|Tabelle erweitern|Tabelle verkleinern|Spielerrangliste|Podium der besten drei Spieler|Platz {rank}|{count} Siege|Sieg|Siege|Serie {count} · Rekord {score}|Warten|Pos.|Spieler|Siege|Siegesserie|Bestes Ergebnis|Keine weiteren Spieler in der Rangliste|Keine Ergebnisse für diese Filter',
        'profile': 'Profilbild von {name}: {cards}|Profilbild von {name}|Punktzahlen: {scores}',
        'history': 'Spielverlauf|Spiel hinzufügen|Trenne die Punktzahlen durch Kommas. Das Datum wird beim Speichern automatisch gesetzt.|Gewinner|Punktzahlen|Spieler auswählen|Spiel speichern|Spiel gespeichert. Rangliste und Serien aktualisiert.|Wähle einen gültigen Spieler.|Gib eine oder mehrere ganze Punktzahlen ein, getrennt durch Kommas.|Zeitraum|Gesamte Zeit|Letztes Jahr|Letzte 6 Monate|Letzte 30 Tage|Sortieren von {from} nach {to}|älter|neuer|Datum|Keine Spiele für diese Filter gefunden|Unbekannter Spieler',
        'cards': 'Joker|Pik-Ass|Pik {rank}|Herzkönig|Pikdame|Kreuzbube|Punktzahl {score}',
    },
    'pt': {
        'nav': 'La Spezia - Classificação|Navegação principal|Páginas|Classificação|Histórico de partidas|Configurações|Abrir barra lateral|Fechar barra lateral',
        'settings': 'Configurações|Áudio|Efeitos sonoros|Música de fundo|Idioma|Escolha o idioma da interface.|Salvar|Restaurar configurações padrão|Restaura áudio e idioma: efeitos 67%, música 4%, inglês.|As configurações já estão nos valores padrão.|Fechar',
        'leaderboard': 'Classificação|Resultados|Expandir tabela|Recolher tabela|Classificação dos jogadores|Pódio dos três melhores jogadores|{rank}º lugar|{count} vitórias|vitória|vitórias|Sequência {count} · Recorde {score}|Aguardando|Pos.|Jogador|Vitórias|Sequência de vitórias|Melhor total|Não há outros jogadores na classificação|Nenhum resultado para estes filtros',
        'profile': 'Foto de perfil de {name}: {cards}|Foto de perfil de {name}|Pontuações: {scores}',
        'history': 'Histórico de partidas|Adicionar partida|Separe as pontuações por vírgulas. A data é definida automaticamente ao salvar.|Vencedor|Pontuações|Selecione um jogador|Salvar partida|Partida registrada. Classificação e sequências atualizadas.|Selecione um jogador válido.|Digite uma ou mais pontuações inteiras separadas por vírgulas.|Período|Todo o período|Último ano|Últimos 6 meses|Últimos 30 dias|Ordenar de {from} para {to}|mais antigo|mais recente|Data|Nenhuma partida encontrada com estes filtros|Jogador desconhecido',
        'cards': 'Coringa|Ás de espadas|{rank} de espadas|Rei de copas|Dama de espadas|Valete de paus|Pontuação {score}',
    },
    'zh': {
        'nav': '拉斯佩齐亚 - 排行榜|主导航|页面|排行榜|比赛历史|设置|打开侧边栏|关闭侧边栏',
        'settings': '设置|音频|音效|背景音乐|语言|选择界面语言。|保存|恢复默认设置|将音频和语言恢复为默认值：音效 67%，音乐 4%，英语。|设置已经是默认值。|关闭',
        'leaderboard': '排行榜|结果|展开表格|收起表格|玩家排行榜|前三名玩家领奖台|第 {rank} 名|{count} 场胜利|场胜利|场胜利|连胜 {count} · 最高分 {score}|等待中|排名|玩家|胜场|连胜|最高总分|排行榜中没有其他玩家|没有符合筛选条件的结果',
        'profile': '{name} 的头像：{cards}|{name} 的头像|分数：{scores}',
        'history': '比赛历史|添加比赛|用逗号分隔分数。保存时会自动设置日期。|获胜者|分数|选择玩家|保存比赛|比赛已记录。排行榜和连胜已更新。|请选择有效的玩家。|请输入一个或多个用逗号分隔的整数分数。|时间范围|全部时间|最近一年|最近 6 个月|最近 30 天|按{from}到{to}排序|最早|最新|日期|没有找到符合筛选条件的比赛|未知玩家',
        'cards': '小丑牌|黑桃 A|黑桃 {rank}|红桃 K|黑桃 Q|梅花 J|分数 {score}',
    },
    'hi': {
        'nav': 'ला स्पेज़िया - रैंकिंग|मुख्य नेविगेशन|पेज|रैंकिंग|मैच इतिहास|सेटिंग्स|साइडबार खोलें|साइडबार बंद करें',
        'settings': 'सेटिंग्स|ऑडियो|ध्वनि प्रभाव|पृष्ठभूमि संगीत|भाषा|इंटरफ़ेस की भाषा चुनें।|सहेजें|डिफ़ॉल्ट सेटिंग्स बहाल करें|ऑडियो और भाषा को मूल मानों पर लाएँ: प्रभाव 67%, संगीत 4%, अंग्रेज़ी।|सेटिंग्स पहले से ही डिफ़ॉल्ट मानों पर हैं।|बंद करें',
        'leaderboard': 'रैंकिंग|परिणाम|तालिका फैलाएँ|तालिका समेटें|खिलाड़ियों की रैंकिंग|शीर्ष तीन खिलाड़ियों का पोडियम|स्थान {rank}|{count} जीत|जीत|जीत|लगातार जीत {count} · रिकॉर्ड {score}|प्रतीक्षा में|स्थान|खिलाड़ी|जीत|लगातार जीत|सर्वश्रेष्ठ कुल|रैंकिंग में कोई अन्य खिलाड़ी नहीं|इन फ़िल्टरों के लिए कोई परिणाम नहीं',
        'profile': '{name} की प्रोफ़ाइल तस्वीर: {cards}|{name} की प्रोफ़ाइल तस्वीर|स्कोर: {scores}',
        'history': 'मैच इतिहास|मैच जोड़ें|स्कोर को अल्पविराम से अलग करें। सहेजते समय तारीख अपने आप दर्ज होगी।|विजेता|स्कोर|खिलाड़ी चुनें|मैच सहेजें|मैच दर्ज हुआ। रैंकिंग और जीत की लड़ी अपडेट हुई।|मान्य खिलाड़ी चुनें।|अल्पविराम से अलग किए गए एक या अधिक पूर्णांक स्कोर डालें।|अवधि|सभी समय|पिछला साल|पिछले 6 महीने|पिछले 30 दिन|{from} से {to} तक क्रमबद्ध करें|सबसे पुराना|सबसे नया|तारीख|इन फ़िल्टरों से कोई मैच नहीं मिला|अज्ञात खिलाड़ी',
        'cards': 'जोकर|हुकुम का इक्का|हुकुम का {rank}|पान का बादशाह|हुकुम की बेगम|चिड़ी का गुलाम|स्कोर {score}',
    },
    'ar': {
        'nav': 'لا سبيتسيا - الترتيب|التنقل الرئيسي|الصفحات|الترتيب|سجل المباريات|الإعدادات|فتح الشريط الجانبي|إغلاق الشريط الجانبي',
        'settings': 'الإعدادات|الصوت|المؤثرات الصوتية|موسيقى الخلفية|اللغة|اختر لغة الواجهة.|حفظ|استعادة الإعدادات الافتراضية|إعادة الصوت واللغة إلى القيم الأصلية: المؤثرات 67%، الموسيقى 4%، الإنجليزية.|الإعدادات بالفعل على القيم الافتراضية.|إغلاق',
        'leaderboard': 'الترتيب|النتائج|توسيع الجدول|طي الجدول|ترتيب اللاعبين|منصة أفضل ثلاثة لاعبين|المركز {rank}|{count} انتصارات|فوز|انتصارات|سلسلة الفوز {count} · الرقم القياسي {score}|قيد الانتظار|المركز|اللاعب|الانتصارات|سلسلة الانتصارات|أفضل مجموع|لا يوجد لاعبون آخرون في الترتيب|لا توجد نتائج لهذه المرشحات',
        'profile': 'صورة الملف الشخصي لـ{name}: {cards}|صورة الملف الشخصي لـ{name}|النقاط: {scores}',
        'history': 'سجل المباريات|إضافة مباراة|افصل النقاط بفواصل. يُحدَّد التاريخ تلقائيًا عند الحفظ.|الفائز|النقاط|اختر لاعبًا|حفظ المباراة|تم تسجيل المباراة وتحديث الترتيب وسلاسل الفوز.|اختر لاعبًا صالحًا.|أدخل نقطة صحيحة واحدة أو أكثر مفصولة بفواصل.|الفترة|كل الأوقات|السنة الماضية|آخر 6 أشهر|آخر 30 يومًا|ترتيب من {from} إلى {to}|الأقدم|الأحدث|التاريخ|لم يتم العثور على مباريات بهذه المرشحات|لاعب غير معروف',
        'cards': 'جوكر|آس البستوني|{rank} بستوني|ملك القلوب|ملكة البستوني|شاب السباتي|النقاط {score}',
    },
    'bn': {
        'nav': 'লা স্পেজিয়া - র‌্যাঙ্কিং|প্রধান নেভিগেশন|পৃষ্ঠা|র‌্যাঙ্কিং|ম্যাচের ইতিহাস|সেটিংস|সাইডবার খুলুন|সাইডবার বন্ধ করুন',
        'settings': 'সেটিংস|অডিও|শব্দের প্রভাব|পটভূমির সংগীত|ভাষা|ইন্টারফেসের ভাষা বেছে নিন।|সংরক্ষণ করুন|ডিফল্ট সেটিংস ফিরিয়ে আনুন|অডিও ও ভাষা মূল মানে ফিরিয়ে আনে: প্রভাব ৬৭%, সংগীত ৪%, ইংরেজি।|সেটিংস ইতিমধ্যেই ডিফল্ট মানে রয়েছে।|বন্ধ করুন',
        'leaderboard': 'র‌্যাঙ্কিং|ফলাফল|তালিকা প্রসারিত করুন|তালিকা সংকুচিত করুন|খেলোয়াড়দের র‌্যাঙ্কিং|সেরা তিন খেলোয়াড়ের পডিয়াম|{rank} নম্বর স্থান|{count}টি জয়|জয়|জয়|টানা জয় {count} · রেকর্ড {score}|অপেক্ষায়|স্থান|খেলোয়াড়|জয়|টানা জয়|সেরা মোট|র‌্যাঙ্কিংয়ে আর কোনো খেলোয়াড় নেই|এই ফিল্টারে কোনো ফল নেই',
        'profile': '{name}-এর প্রোফাইল ছবি: {cards}|{name}-এর প্রোফাইল ছবি|স্কোর: {scores}',
        'history': 'ম্যাচের ইতিহাস|ম্যাচ যোগ করুন|কমা দিয়ে স্কোর আলাদা করুন। সংরক্ষণের সময় তারিখ স্বয়ংক্রিয়ভাবে বসবে।|বিজয়ী|স্কোর|খেলোয়াড় বেছে নিন|ম্যাচ সংরক্ষণ করুন|ম্যাচ সংরক্ষিত। র‌্যাঙ্কিং ও জয়ের ধারা আপডেট হয়েছে।|বৈধ খেলোয়াড় বেছে নিন।|কমা দিয়ে আলাদা করা এক বা একাধিক পূর্ণসংখ্যার স্কোর লিখুন।|সময়কাল|সব সময়|গত বছর|গত ৬ মাস|গত ৩০ দিন|{from} থেকে {to} অনুযায়ী সাজান|সবচেয়ে পুরোনো|সবচেয়ে নতুন|তারিখ|এই ফিল্টারে কোনো ম্যাচ পাওয়া যায়নি|অজানা খেলোয়াড়',
        'cards': 'জোকার|ইস্কাপনের টেক্কা|ইস্কাপনের {rank}|হরতনের রাজা|ইস্কাপনের রানি|চিড়িতনের গোলাম|স্কোর {score}',
    },
    'ru': {
        'nav': 'Ла Специя — рейтинг|Главная навигация|Страницы|Рейтинг|История матчей|Настройки|Открыть боковую панель|Закрыть боковую панель',
        'settings': 'Настройки|Звук|Звуковые эффекты|Фоновая музыка|Язык|Выберите язык интерфейса.|Сохранить|Восстановить настройки по умолчанию|Сброс звука и языка: эффекты 67 %, музыка 4 %, английский.|Настройки уже имеют значения по умолчанию.|Закрыть',
        'leaderboard': 'Рейтинг|Результаты|Развернуть таблицу|Свернуть таблицу|Рейтинг игроков|Подиум трёх лучших игроков|Место {rank}|Побед: {count}|победа|победы|Серия {count} · Рекорд {score}|Ожидание|Место|Игрок|Победы|Серия побед|Лучший результат|В рейтинге нет других игроков|Нет результатов по этим фильтрам',
        'profile': 'Аватар игрока {name}: {cards}|Аватар игрока {name}|Очки: {scores}',
        'history': 'История матчей|Добавить матч|Разделяйте очки запятыми. Дата устанавливается автоматически при сохранении.|Победитель|Очки|Выберите игрока|Сохранить матч|Матч записан. Рейтинг и серии обновлены.|Выберите допустимого игрока.|Введите одно или несколько целых значений очков через запятую.|Период|Всё время|Последний год|Последние 6 месяцев|Последние 30 дней|Сортировать от {from} к {to}|старого|нового|Дата|Матчи по этим фильтрам не найдены|Неизвестный игрок',
        'cards': 'Джокер|Туз пик|{rank} пик|Король червей|Дама пик|Валет треф|Очки {score}',
    },
    'id': {
        'nav': 'La Spezia - Peringkat|Navigasi utama|Halaman|Peringkat|Riwayat pertandingan|Pengaturan|Buka bilah samping|Tutup bilah samping',
        'settings': 'Pengaturan|Audio|Efek suara|Musik latar|Bahasa|Pilih bahasa antarmuka.|Simpan|Kembalikan pengaturan bawaan|Mengembalikan audio dan bahasa ke nilai awal: efek 67%, musik 4%, bahasa Inggris.|Pengaturan sudah menggunakan nilai bawaan.|Tutup',
        'leaderboard': 'Peringkat|Hasil|Perluas tabel|Ciutkan tabel|Peringkat pemain|Podium tiga pemain terbaik|Peringkat {rank}|{count} kemenangan|kemenangan|kemenangan|Rentetan {count} · Rekor {score}|Menunggu|Pos.|Pemain|Kemenangan|Rentetan kemenangan|Total terbaik|Tidak ada pemain lain dalam peringkat|Tidak ada hasil untuk filter ini',
        'profile': 'Foto profil {name}: {cards}|Foto profil {name}|Skor: {scores}',
        'history': 'Riwayat pertandingan|Tambah pertandingan|Pisahkan skor dengan koma. Tanggal diatur otomatis saat menyimpan.|Pemenang|Skor|Pilih pemain|Simpan pertandingan|Pertandingan dicatat. Peringkat dan rentetan diperbarui.|Pilih pemain yang valid.|Masukkan satu atau lebih skor bilangan bulat yang dipisahkan koma.|Periode|Sepanjang waktu|Setahun terakhir|6 bulan terakhir|30 hari terakhir|Urutkan dari {from} ke {to}|terlama|terbaru|Tanggal|Tidak ada pertandingan untuk filter ini|Pemain tidak dikenal',
        'cards': 'Joker|As sekop|{rank} sekop|Raja hati|Ratu sekop|Jack keriting|Skor {score}',
    },
    'ur': {
        'nav': 'لا سپیزیا - درجہ بندی|مرکزی نیویگیشن|صفحات|درجہ بندی|میچ کی تاریخ|ترتیبات|سائیڈ بار کھولیں|سائیڈ بار بند کریں',
        'settings': 'ترتیبات|آڈیو|صوتی اثرات|پس منظر کی موسیقی|زبان|انٹرفیس کی زبان منتخب کریں۔|محفوظ کریں|ڈیفالٹ ترتیبات بحال کریں|آڈیو اور زبان کو بنیادی حالت میں لائیں: اثرات 67%، موسیقی 4%، انگریزی۔|ترتیبات پہلے ہی ڈیفالٹ حالت میں ہیں۔|بند کریں',
        'leaderboard': 'درجہ بندی|نتائج|جدول پھیلائیں|جدول سمیٹیں|کھلاڑیوں کی درجہ بندی|سب سے اوپر تین کھلاڑیوں کا پوڈیم|مقام {rank}|{count} فتوحات|فتح|فتوحات|مسلسل جیت {count} · ریکارڈ {score}|انتظار میں|مقام|کھلاڑی|فتوحات|مسلسل جیت|بہترین مجموعہ|درجہ بندی میں کوئی اور کھلاڑی نہیں|ان فلٹرز کے لیے کوئی نتیجہ نہیں',
        'profile': '{name} کی پروفائل تصویر: {cards}|{name} کی پروفائل تصویر|اسکور: {scores}',
        'history': 'میچ کی تاریخ|میچ شامل کریں|اسکور کو کاما سے الگ کریں۔ محفوظ کرتے وقت تاریخ خودکار طور پر طے ہوگی۔|فاتح|اسکور|کھلاڑی منتخب کریں|میچ محفوظ کریں|میچ درج ہوگیا۔ درجہ بندی اور مسلسل جیت اپ ڈیٹ ہوگئی۔|درست کھلاڑی منتخب کریں۔|کاما سے الگ کیے گئے ایک یا زیادہ صحیح عدد اسکور درج کریں۔|مدت|تمام وقت|گزشتہ سال|گزشتہ 6 ماہ|گزشتہ 30 دن|{from} سے {to} تک ترتیب دیں|قدیم ترین|تازہ ترین|تاریخ|ان فلٹرز سے کوئی میچ نہیں ملا|نامعلوم کھلاڑی',
        'cards': 'جوکر|حکم کا اکّا|حکم کا {rank}|پان کا بادشاہ|حکم کی بیگم|چڑی کا غلام|اسکور {score}',
    },
    'ja': {
        'nav': 'ラ・スペツィア - ランキング|メインナビゲーション|ページ|ランキング|対戦履歴|設定|サイドバーを開く|サイドバーを閉じる',
        'settings': '設定|音声|効果音|BGM|言語|画面の言語を選択してください。|保存|初期設定に戻す|音声と言語を初期値に戻します：効果音 67%、音楽 4%、英語。|設定はすでに初期値です。|閉じる',
        'leaderboard': 'ランキング|結果|表を展開|表を折りたたむ|プレイヤーランキング|上位3人の表彰台|{rank}位|{count}勝|勝|勝|連勝 {count} · 最高記録 {score}|待機中|順位|プレイヤー|勝利数|連勝数|最高合計|ランキングに他のプレイヤーはいません|この条件に一致する結果はありません',
        'profile': '{name}のプロフィール画像：{cards}|{name}のプロフィール画像|スコア：{scores}',
        'history': '対戦履歴|対戦を追加|スコアはカンマで区切ってください。保存時に日時が自動設定されます。|勝者|スコア|プレイヤーを選択|対戦を保存|対戦を記録しました。ランキングと連勝数を更新しました。|有効なプレイヤーを選択してください。|整数のスコアを1つ以上、カンマ区切りで入力してください。|期間|全期間|過去1年|過去6か月|過去30日|{from}から{to}の順に並べ替え|古い順|新しい順|日付|この条件に一致する対戦はありません|不明なプレイヤー',
        'cards': 'ジョーカー|スペードのエース|スペードの{rank}|ハートのキング|スペードのクイーン|クラブのジャック|スコア {score}',
    },
    'mr': {
        'nav': 'ला स्पेझिया - क्रमवारी|मुख्य नेव्हिगेशन|पाने|क्रमवारी|सामन्यांचा इतिहास|सेटिंग्ज|बाजूचा पट्टा उघडा|बाजूचा पट्टा बंद करा',
        'settings': 'सेटिंग्ज|ऑडिओ|ध्वनी प्रभाव|पार्श्वसंगीत|भाषा|इंटरफेसची भाषा निवडा.|जतन करा|मूलभूत सेटिंग्ज पुनर्स्थापित करा|ऑडिओ आणि भाषा मूळ स्थितीत आणा: प्रभाव 67%, संगीत 4%, इंग्रजी.|सेटिंग्ज आधीच मूलभूत स्थितीत आहेत.|बंद करा',
        'leaderboard': 'क्रमवारी|निकाल|तक्ता विस्तृत करा|तक्ता संकुचित करा|खेळाडूंची क्रमवारी|पहिल्या तीन खेळाडूंचे व्यासपीठ|स्थान {rank}|{count} विजय|विजय|विजय|सलग विजय {count} · विक्रम {score}|प्रतीक्षेत|स्थान|खेळाडू|विजय|सलग विजय|सर्वोत्तम एकूण|क्रमवारीत इतर खेळाडू नाहीत|या फिल्टरसाठी निकाल नाहीत',
        'profile': '{name} चे प्रोफाइल चित्र: {cards}|{name} चे प्रोफाइल चित्र|गुण: {scores}',
        'history': 'सामन्यांचा इतिहास|सामना जोडा|गुण स्वल्पविरामाने वेगळे करा. जतन करताना तारीख आपोआप निश्चित होते.|विजेता|गुण|खेळाडू निवडा|सामना जतन करा|सामना नोंदवला. क्रमवारी आणि सलग विजय अद्ययावत झाले.|वैध खेळाडू निवडा.|स्वल्पविरामाने वेगळे केलेले एक किंवा अधिक पूर्णांक गुण टाका.|कालावधी|सर्व काळ|मागील वर्ष|मागील 6 महिने|मागील 30 दिवस|{from} ते {to} क्रमाने लावा|सर्वात जुने|सर्वात नवे|तारीख|या फिल्टरमध्ये सामने सापडले नाहीत|अज्ञात खेळाडू',
        'cards': 'जोकर|इस्पिकचा एक्का|इस्पिकचा {rank}|बदामचा राजा|इस्पिकची राणी|किलवरचा गुलाम|गुण {score}',
    },
    'vi': {
        'nav': 'La Spezia - Bảng xếp hạng|Điều hướng chính|Trang|Bảng xếp hạng|Lịch sử trận đấu|Cài đặt|Mở thanh bên|Đóng thanh bên',
        'settings': 'Cài đặt|Âm thanh|Hiệu ứng âm thanh|Nhạc nền|Ngôn ngữ|Chọn ngôn ngữ giao diện.|Lưu|Khôi phục cài đặt mặc định|Đưa âm thanh và ngôn ngữ về mặc định: hiệu ứng 67%, nhạc 4%, tiếng Anh.|Cài đặt đã ở giá trị mặc định.|Đóng',
        'leaderboard': 'Bảng xếp hạng|Kết quả|Mở rộng bảng|Thu gọn bảng|Bảng xếp hạng người chơi|Bục vinh danh ba người chơi đứng đầu|Hạng {rank}|{count} trận thắng|trận thắng|trận thắng|Chuỗi thắng {count} · Kỷ lục {score}|Đang chờ|Hạng|Người chơi|Số trận thắng|Chuỗi thắng|Tổng cao nhất|Không còn người chơi nào trong bảng xếp hạng|Không có kết quả cho bộ lọc này',
        'profile': 'Ảnh hồ sơ của {name}: {cards}|Ảnh hồ sơ của {name}|Điểm: {scores}',
        'history': 'Lịch sử trận đấu|Thêm trận đấu|Phân tách điểm bằng dấu phẩy. Ngày được đặt tự động khi lưu.|Người thắng|Điểm|Chọn người chơi|Lưu trận đấu|Đã ghi trận đấu. Bảng xếp hạng và chuỗi thắng đã cập nhật.|Chọn người chơi hợp lệ.|Nhập một hoặc nhiều điểm nguyên, phân tách bằng dấu phẩy.|Khoảng thời gian|Mọi thời điểm|Năm qua|6 tháng qua|30 ngày qua|Sắp xếp từ {from} đến {to}|cũ nhất|mới nhất|Ngày|Không tìm thấy trận đấu với bộ lọc này|Người chơi không xác định',
        'cards': 'Phăng teo|Át bích|{rank} bích|Già cơ|Đầm bích|Bồi chuồn|Điểm {score}',
    },
    'te': {
        'nav': 'లా స్పెజియా - ర్యాంకింగ్|ప్రధాన నావిగేషన్|పేజీలు|ర్యాంకింగ్|మ్యాచ్ చరిత్ర|సెట్టింగ్‌లు|సైడ్‌బార్ తెరవండి|సైడ్‌బార్ మూసివేయండి',
        'settings': 'సెట్టింగ్‌లు|ఆడియో|ధ్వని ప్రభావాలు|నేపథ్య సంగీతం|భాష|ఇంటర్‌ఫేస్ భాషను ఎంచుకోండి.|సేవ్ చేయండి|డిఫాల్ట్ సెట్టింగ్‌లను పునరుద్ధరించండి|ఆడియో మరియు భాషను ప్రారంభ విలువలకు మార్చండి: ప్రభావాలు 67%, సంగీతం 4%, ఆంగ్లం.|సెట్టింగ్‌లు ఇప్పటికే డిఫాల్ట్ విలువల్లో ఉన్నాయి.|మూసివేయండి',
        'leaderboard': 'ర్యాంకింగ్|ఫలితాలు|పట్టికను విస్తరించండి|పట్టికను కుదించండి|ఆటగాళ్ల ర్యాంకింగ్|మొదటి ముగ్గురు ఆటగాళ్ల పోడియం|స్థానం {rank}|{count} విజయాలు|విజయం|విజయాలు|వరుస విజయాలు {count} · రికార్డు {score}|వేచి ఉంది|స్థానం|ఆటగాడు|విజయాలు|వరుస విజయాలు|ఉత్తమ మొత్తం|ర్యాంకింగ్‌లో ఇతర ఆటగాళ్లు లేరు|ఈ ఫిల్టర్‌లకు ఫలితాలు లేవు',
        'profile': '{name} ప్రొఫైల్ చిత్రం: {cards}|{name} ప్రొఫైల్ చిత్రం|స్కోర్లు: {scores}',
        'history': 'మ్యాచ్ చరిత్ర|మ్యాచ్ జోడించండి|స్కోర్లను కామాలతో వేరు చేయండి. సేవ్ చేసినప్పుడు తేదీ స్వయంచాలకంగా సెట్ అవుతుంది.|విజేత|స్కోర్లు|ఆటగాడిని ఎంచుకోండి|మ్యాచ్ సేవ్ చేయండి|మ్యాచ్ నమోదైంది. ర్యాంకింగ్ మరియు వరుస విజయాలు నవీకరించబడ్డాయి.|సరైన ఆటగాడిని ఎంచుకోండి.|కామాలతో వేరు చేసిన ఒకటి లేదా అంతకంటే ఎక్కువ పూర్ణాంక స్కోర్లను నమోదు చేయండి.|వ్యవధి|మొత్తం కాలం|గత సంవత్సరం|గత 6 నెలలు|గత 30 రోజులు|{from} నుండి {to} వరకు క్రమబద్ధీకరించండి|పాతది|కొత్తది|తేదీ|ఈ ఫిల్టర్‌లతో మ్యాచ్‌లు కనుగొనబడలేదు|తెలియని ఆటగాడు',
        'cards': 'జోకర్|స్పేడ్ ఏస్|స్పేడ్ {rank}|హార్ట్ కింగ్|స్పేడ్ క్వీన్|క్లబ్ జాక్|స్కోరు {score}',
    },
    'ha': {
        'nav': 'La Spezia - Jerin matsayi|Babban kewaya|Shafuka|Jerin matsayi|Tarihin wasanni|Saituna|Buɗe gefen shafi|Rufe gefen shafi',
        'settings': 'Saituna|Sauti|Tasirin sauti|Kiɗan baya|Harshe|Zaɓi harshen shafin.|Ajiye|Mayar da saitunan asali|Mayar da sauti da harshe zuwa asali: tasiri 67%, kiɗa 4%, Turanci.|Saitunan sun riga sun kasance na asali.|Rufe',
        'leaderboard': 'Jerin matsayi|Sakamako|Faɗaɗa tebur|Rage tebur|Jerin matsayin ’yan wasa|Dandalin ’yan wasa uku na farko|Matsayi {rank}|Nasara {count}|nasara|nasarori|Jerin nasara {count} · Mafi girma {score}|Ana jira|Matsayi|Ɗan wasa|Nasarori|Jerin nasarori|Mafi kyawun jimla|Babu sauran ’yan wasa a jerin|Babu sakamako ga waɗannan matatun',
        'profile': 'Hoton bayanin {name}: {cards}|Hoton bayanin {name}|Maki: {scores}',
        'history': 'Tarihin wasanni|Ƙara wasa|Raba maki da waƙafi. Ana saita kwanan wata ta atomatik lokacin ajiya.|Mai nasara|Maki|Zaɓi ɗan wasa|Ajiye wasa|An yi rajistar wasa. An sabunta matsayi da jerin nasara.|Zaɓi ɗan wasa mai inganci.|Shigar da maki cikakku ɗaya ko fiye da waƙafi ya raba.|Lokaci|Duk lokaci|Shekarar da ta gabata|Watanni 6 da suka gabata|Kwanaki 30 da suka gabata|Jera daga {from} zuwa {to}|mafi tsufa|mafi sabo|Kwanan wata|Ba a sami wasa da waɗannan matatun ba|Ɗan wasa da ba a sani ba',
        'cards': 'Joker|Ace na spade|{rank} na spade|Sarkin heart|Sarauniyar spade|Jack na club|Maki {score}',
    },
    'tr': {
        'nav': 'La Spezia - Sıralama|Ana gezinme|Sayfalar|Sıralama|Maç geçmişi|Ayarlar|Kenar çubuğunu aç|Kenar çubuğunu kapat',
        'settings': 'Ayarlar|Ses|Ses efektleri|Arka plan müziği|Dil|Arayüz dilini seçin.|Kaydet|Varsayılan ayarları geri yükle|Sesi ve dili başlangıç değerlerine döndürür: efektler %67, müzik %4, İngilizce.|Ayarlar zaten varsayılan değerlerde.|Kapat',
        'leaderboard': 'Sıralama|Sonuçlar|Tabloyu genişlet|Tabloyu daralt|Oyuncu sıralaması|İlk üç oyuncunun podyumu|{rank}. sıra|{count} galibiyet|galibiyet|galibiyet|Seri {count} · Rekor {score}|Bekleniyor|Sıra|Oyuncu|Galibiyetler|Galibiyet serisi|En iyi toplam|Sıralamada başka oyuncu yok|Bu filtreler için sonuç yok',
        'profile': '{name} profil resmi: {cards}|{name} profil resmi|Puanlar: {scores}',
        'history': 'Maç geçmişi|Maç ekle|Puanları virgülle ayırın. Kaydederken tarih otomatik ayarlanır.|Kazanan|Puanlar|Oyuncu seçin|Maçı kaydet|Maç kaydedildi. Sıralama ve seriler güncellendi.|Geçerli bir oyuncu seçin.|Virgülle ayrılmış bir veya daha fazla tam sayı puan girin.|Dönem|Tüm zamanlar|Son yıl|Son 6 ay|Son 30 gün|{from} ile {to} arasında sırala|en eski|en yeni|Tarih|Bu filtrelerle maç bulunamadı|Bilinmeyen oyuncu',
        'cards': 'Joker|Maça ası|Maça {rank}|Kupa papazı|Maça kızı|Sinek valesi|Puan {score}',
    },
    'ko': {
        'nav': '라스페치아 - 순위표|주 탐색|페이지|순위표|경기 기록|설정|사이드바 열기|사이드바 닫기',
        'settings': '설정|오디오|효과음|배경 음악|언어|인터페이스 언어를 선택하세요.|저장|기본 설정 복원|오디오와 언어를 초기값으로 되돌립니다: 효과음 67%, 음악 4%, 영어.|설정이 이미 기본값입니다.|닫기',
        'leaderboard': '순위표|결과|표 펼치기|표 접기|플레이어 순위표|상위 세 명의 시상대|{rank}위|{count}승|승|승|연승 {count} · 최고 기록 {score}|대기 중|순위|플레이어|승리|연승|최고 합계|순위표에 다른 플레이어가 없습니다|이 필터에 대한 결과가 없습니다',
        'profile': '{name}의 프로필 사진: {cards}|{name}의 프로필 사진|점수: {scores}',
        'history': '경기 기록|경기 추가|점수를 쉼표로 구분하세요. 저장할 때 날짜가 자동으로 설정됩니다.|승자|점수|플레이어 선택|경기 저장|경기가 기록되었습니다. 순위와 연승이 업데이트되었습니다.|유효한 플레이어를 선택하세요.|쉼표로 구분한 정수 점수를 하나 이상 입력하세요.|기간|전체 기간|지난 1년|지난 6개월|지난 30일|{from}부터 {to}까지 정렬|오래된 순|최신 순|날짜|이 필터에 맞는 경기가 없습니다|알 수 없는 플레이어',
        'cards': '조커|스페이드 에이스|스페이드 {rank}|하트 킹|스페이드 퀸|클럽 잭|점수 {score}',
    },
    'ro': {
        'nav': 'La Spezia - Clasament|Navigare principală|Pagini|Clasament|Istoricul meciurilor|Setări|Deschide bara laterală|Închide bara laterală',
        'settings': 'Setări|Audio|Efecte sonore|Muzică de fundal|Limbă|Alege limba interfeței.|Salvează|Restabilește setările implicite|Readuce sunetul și limba la valorile inițiale: efecte 67%, muzică 4%, engleză.|Setările au deja valorile implicite.|Închide',
        'leaderboard': 'Clasament|Rezultate|Extinde tabelul|Restrânge tabelul|Clasamentul jucătorilor|Podiumul primilor trei jucători|Locul {rank}|{count} victorii|victorie|victorii|Serie {count} · Record {score}|În așteptare|Poz.|Jucător|Victorii|Serie de victorii|Cel mai bun total|Nu mai sunt alți jucători în clasament|Nu există rezultate pentru aceste filtre',
        'profile': 'Fotografia de profil a lui {name}: {cards}|Fotografia de profil a lui {name}|Scoruri: {scores}',
        'history': 'Istoricul meciurilor|Adaugă meci|Separă scorurile prin virgule. Data este setată automat la salvare.|Câștigător|Scoruri|Selectează un jucător|Salvează meciul|Meci înregistrat. Clasamentul și seriile au fost actualizate.|Selectează un jucător valid.|Introdu unul sau mai multe scoruri întregi separate prin virgule.|Perioadă|Toată perioada|Ultimul an|Ultimele 6 luni|Ultimele 30 de zile|Sortează de la {from} la {to}|cel mai vechi|cel mai recent|Data|Nu s-au găsit meciuri cu aceste filtre|Jucător necunoscut',
        'cards': 'Joker|As de pică|{rank} de pică|Rege de cupă|Damă de pică|Valet de treflă|Scor {score}',
    },
}

for code, sections in packs.items():
    translated = {}
    for section, keys in groups.items():
        values = sections[section].split('|')
        if len(values) != len(keys):
            raise ValueError(f'{code}/{section}: {len(values)} values, expected {len(keys)}')
        for key, value in zip(keys, values):
            if not value:
                raise ValueError(f'{code}: empty {key}')
            translated[key] = value
    translated['app.footer'] = footers[code]
    extra_values = extras[code].split('|')
    if len(extra_values) != len(extra_keys):
        raise ValueError(f'{code}/extras: {len(extra_values)} values, expected {len(extra_keys)}')
    translated.update(zip(extra_keys, extra_values))
    translated['leaderboard.cancel'] = cancels[code]
    (root / f'{code}.json').write_text(json.dumps(translated, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
