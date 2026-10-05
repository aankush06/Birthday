import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, memo, useEffect } from "react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Heart, Sparkles, ArrowRight } from "lucide-react";

// Memoized decorative sparkle component
const DecorativeSparkle = memo(({ delay, left, top }: { delay: number; left: string; top: string }) => (
  <motion.div
    className="absolute will-change-transform"
    style={{ left, top }}
    animate={{
      y: [0, -15, 0],
      opacity: [0.2, 0.35, 0.2],
    }}
    transition={{
      duration: 3 + delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-pink-400/30" />
  </motion.div>
));

DecorativeSparkle.displayName = "DecorativeSparkle";

// Optimized story section component with memoization
const StorySection = memo(({
  item,
  index,
  total,
}: {
  item: any;
  index: number;
  total: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2, margin: "100px" });
  const [isImageHovered, setIsImageHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  // Optimized transforms
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={ref}
      className="min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center py-12 sm:py-16 md:py-24 px-4 md:px-6 relative"
    >
      {/* Simplified floating decorations - only 2 sparkles */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 0.3 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 pointer-events-none"
      >
        {[...Array(2)].map((_, i) => (
          <DecorativeSparkle
            key={i}
            delay={i}
            left={`${30 + i * 40}%`}
            top={`${20 + i * 30}%`}
          />
        ))}
      </motion.div>

      <motion.div
        style={{ opacity, y }}
        className={cn(
          "max-w-6xl w-full grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 items-center relative z-10 will-change-transform",
          !isEven && "md:grid-flow-dense",
        )}
      >
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -40 : 40 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className={cn("space-y-4 sm:space-y-6", !isEven && "md:col-start-2")}
        >
          {/* Chapter Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.4, delay: 0.3, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-pink-100 to-rose-100 rounded-full text-rose-600 font-handwriting text-sm md:text-base shadow-sm border border-pink-200/50"
          >
            <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-rose-400" />
            Chapter {index + 1} of {total}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-br from-rose-700 via-pink-600 to-purple-600 leading-tight"
          >
            {item.title}
          </motion.h2>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "3rem" } : { width: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="h-1 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full"
          />

          {/* Content */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 font-body leading-relaxed md:leading-loose"
          >
            {item.content}
          </motion.p>

          {/* Quote Mark */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex items-center gap-2 text-pink-400/50"
          >
            <Heart className="w-3 h-3 sm:w-4 sm:h-4 fill-pink-300/50" />
            <div className="h-px flex-1 bg-gradient-to-r from-pink-300/50 to-transparent" />
          </motion.div>
        </motion.div>

        {/* Image - touch-friendly */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? 40 : -40 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className={cn("relative group w-full", !isEven && "md:col-start-1")}
          onMouseEnter={() => setIsImageHovered(true)}
          onMouseLeave={() => setIsImageHovered(false)}
        >
          {/* Simplified decorative layers - reduced rotation and transforms */}
          <motion.div
            animate={{
              rotate: isImageHovered ? 4 : 2,
              scale: isImageHovered ? 1.01 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-br from-pink-200 to-rose-200 rounded-2xl sm:rounded-3xl transform shadow-md will-change-transform"
          />

          <motion.div
            animate={{
              rotate: isImageHovered ? -2 : -1,
            }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="absolute inset-0 bg-gradient-to-tl from-purple-200 to-pink-200 rounded-2xl sm:rounded-3xl transform shadow-sm will-change-transform"
          />

          {/* Main image container */}
          <motion.div
            animate={{
              y: isImageHovered ? -6 : 0,
            }}
            transition={{ duration: 0.4 }}
            className="relative bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl shadow-xl border-2 border-white overflow-hidden aspect-[4/3] will-change-transform"
          >
            {item.imageUrl ? (
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover rounded-xl sm:rounded-2xl"
                animate={{
                  scale: isImageHovered ? 1.03 : 1,
                }}
                transition={{ duration: 0.4 }}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl sm:rounded-2xl flex items-center justify-center">
                <motion.span
                  animate={{
                    scale: isImageHovered ? [1, 1.15, 1] : 1,
                  }}
                  transition={{ duration: 0.6, repeat: isImageHovered ? Infinity : 0 }}
                  className="text-4xl sm:text-6xl md:text-8xl"
                >
                  ❤️
                </motion.span>
              </div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
});

StorySection.displayName = "StorySection";

export default function Story() {
  const headerRef = useRef(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.3 });

  // Instant scroll reset on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Placeholder story data
  const sortedStory = [
    {
      id: 1,
      title: "The First Glance",
      content:"July 2008.\n\n We were just little kids in first standard when I first saw you from across the room.\n\n There you were—utterly adorable, hair tied in two sweet braids with ribbons, shyly buried in your notebooks and completely unaware of the world around you.\n\n I still remember the way you used to sit, quietly engrossed in your studies, never realizing that a little boy across the classroom had silently decided you were the prettiest thing in the universe.\n\n In my mind, you immediately became my favorite little chhotu bachha.\n\n You may have grown into this breathtaking, graceful woman now, but to me, that pure, endearing spark never faded. \n\nYou were my very first crush—and today, the love of my life\n\n",
      imageUrl: "/1.jpeg",
      order: 1
    },
    
    {
      id: 2,
      title: "The Boy Who Wore His Heart on His Sleeve",
      content: "It didn’t take long for the whole class to figure it out, and soon your name became the soundtrack to every tease directed at me.\n\n But I wasn't embarrassed at all.\n\n I stood right up before everyone and boldly declared that I liked you.\n\n It was that pure, untainted kind of childhood love—unfiltered, fearless, and so wonderfully innocent.\n\n🌅",
      imageUrl: "/2.jpeg",
      order: 2
    },
    {
      id: 3,
      title: "The Silence Between Us",
      content: "After second standard, time and circumstances quietly stepped in.\n\n Conversations dwindled, and we drifted apart into our own separate worlds.\n\n Years slipped by, school ended, and you moved away to Pune for your studies.\n\n Life kept moving forward, but a quiet, tender piece of my childhood remained paused exactly where you left it.\n\n🥰",
      imageUrl: "/3.jpeg",
      order: 3
    },
    {
      id: 4,
      title: "When the Universe Decided It Was Time",
      content: "For years, we were reduced to brief Instagram courtesies—just passing birthday wishes once a year.\n\n You were living your life, weathering your own storms and heartbreaks with someone else that I knew nothing about; I was trying to grow up, navigate my own lows, and heal through life's shifting phases.\n\n Then, almost like fate decided our patience had been tested enough, the universe brought you back into my life.\n\n An eighteen-year history restarted with a single message.\n\n What began as simple texts turned into endless conversations, and those messages quietly grew into late-night phone calls I never wanted to end.\n\n When we spoke again, I saw how much you had grown.\n\n Life had tested you and shaped you, yet your heart had remained so remarkably gentle.\n\n Watching the resilient, graceful woman you’ve become made me fall for you all over again—not just for the little girl from school, but for the incredible person standing in front of me today.\n\nNow, the simplest things brighten my entire world: seeing my phone light up with your name instantly fixes a rough day, a ten-minute conversation feels like a breath of fresh air, and I catch myself smiling at my screen like an idiot just re-reading our chats.\n\n Hearing your voice makes my heart race and pound, yet somehow quietens every worry inside me.\n\n I didn't plan any of this; my heart just recognized where it belonged.\n\n Waiting all those years through the silence suddenly made complete and beautiful sense.\n\n💖",
      imageUrl: "/12.jpeg",
      order: 4
    },
    {
      id: 5,
      title: "A Letter to You, on Your Birthday",
      content: "It has been over 6,652 days since the day I first saw you, and here I am, still looking at you with that exact same wonder—only now, with a heart overflowing with love.\n\nHappy Birthday to my happiest place, my peace, and the most beautiful chapter of my life.\n\nI don't know every detail of what destiny has written in the stars, but my quietest, most sincere prayer every single day is to build a life and a future with you by my side.\n\n With zero doubt or hesitation, you are truly the best and purest soul I have ever known.\n\nWhatever pacing life takes, and whatever chapter comes next—I am right here.\n\n No rush, no pressure, and no expectations.\n\n Just an honest heart that chooses you every single day.\n\n Please know that you hold a permanent, sacred home in my heart where you will always be cherished, respected, and deeply loved.\n\n Nobody could ever replace the place you hold.\n\nMay this year bring you all the warmth, boundless joy, and blessings this world can offer.\n\nHappiest Birthday, Maahi.\n\n❤️🎂",
      imageUrl: "/9.jpeg",
      order: 5
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Simplified background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-pink-100/30 via-transparent to-transparent pointer-events-none" />

      {/* Single optimized glow */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] bg-gradient-to-r from-pink-300/20 to-purple-300/20 rounded-full blur-[100px] will-change-transform"
      />

      {/* Music Player - Fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <MusicPlayer />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <header ref={headerRef} className="text-center py-12 sm:py-16 md:py-24 px-4 relative">
          {/* Simplified decorative top element */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
            className="flex items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            </motion.div>
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 fill-rose-400" />
            <div className="h-px w-12 sm:w-16 bg-gradient-to-r from-transparent via-pink-400 to-transparent" />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="will-change-transform"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="space-y-4 sm:space-y-6"
          >
            <motion.h1
              animate={{
                textShadow: [
                  "0 0 15px rgba(244, 114, 182, 0.08)",
                  "0 0 20px rgba(244, 114, 182, 0.12)",
                  "0 0 15px rgba(244, 114, 182, 0.08)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 leading-tight px-4"
            >
              Our Journey
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-serif italic max-w-2xl mx-auto px-4"
            >
              Every moment with you is a favorite memory waiting to be cherished forever.
            </motion.p>
          </motion.div>

          {/* Simplified floating hearts decoration - only 3 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex items-center justify-center gap-2 mt-6 sm:mt-8"
          >
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
                className="will-change-transform"
              >
                <Heart className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-pink-400/50 fill-pink-300/50" />
              </motion.div>
            ))}
          </motion.div>
        </header>

        {/* Story Sections */}
        <div className="space-y-0">
          {sortedStory.map((segment, idx) => (
            <StorySection
              key={segment.id}
              item={segment}
              index={idx}
              total={sortedStory.length}
            />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "100px" }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center py-16 sm:py-20 md:py-32 px-4 relative"
        >
          {/* Simplified decorative background */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 bg-gradient-to-br from-pink-300/20 to-purple-300/20 rounded-full blur-[60px]" />
          </motion.div>

          {/* Content */}
          <div className="relative z-10 space-y-6 sm:space-y-8 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="font-handwriting text-lg sm:text-xl md:text-2xl mb-3 text-pink-600"
            >
              But wait, there's more to our story...
            </motion.p>

            <Link href="/memories">
              <motion.button
                whileHover={{ scale: 1.03, y: -3 }}
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 text-white rounded-full font-serif text-sm sm:text-base md:text-lg shadow-xl shadow-pink-300/40 overflow-hidden will-change-transform touch-manipulation"
              >
                {/* Simplified button glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0, 0.4],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-white/20 rounded-full"
                />

                <span className="relative flex items-center gap-2 sm:gap-3">
                  See Our Memories
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="will-change-transform"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </span>
              </motion.button>
            </Link>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-xs sm:text-sm md:text-base text-gray-500 italic"
            >
              Every picture tells a thousand words of love
            </motion.p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}