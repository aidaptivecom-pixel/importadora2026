// ============ ANIMATION COMPONENTS EXPORT ============
// Componentes de animación reutilizables para la aplicación

// Core Components
export { default as PageTransition } from './PageTransition';
export { default as AnimatedCard } from './AnimatedCard';
export { default as AnimatedCounter } from './AnimatedCounter';
export { default as AnimatedModal } from './AnimatedModal';
export { default as AnimatedProgress } from './AnimatedProgress';

// KPI Components
export { default as AnimatedKPICard, AnimatedKPIGrid } from './AnimatedKPICard';

// List & Table Components
export { AnimatedList, AnimatedListItem } from './AnimatedList';
export { AnimatedTableBody, AnimatedTableRow } from './AnimatedTable';

// Section Components
export { 
  default as AnimatedSection,
  AnimatedGroup,
  AnimatedItem,
  FadeInOnScroll 
} from './AnimatedSection';

// Animation Variants & Utilities
export * from '../../utils/animations';

// ============ USAGE EXAMPLES ============
/*

// Page Transition (wrap your pages)
<PageTransition pageKey={currentPage}>
  <MyPage />
</PageTransition>

// Animated KPI Card with counter
<AnimatedKPICard
  title="Total Ventas"
  value={891450}
  icon={DollarSign}
  iconBgColor="bg-emerald-50"
  iconColor="text-emerald-600"
  valueColor="text-emerald-600"
  format="currency"
  index={0}
/>

// Animated Section (auto-animates on scroll)
<AnimatedSection animation="fadeUp" delay={0.2}>
  <YourContent />
</AnimatedSection>

// Animated Group with stagger
<AnimatedGroup className="grid grid-cols-4 gap-4">
  {cards.map(card => <Card key={card.id} {...card} />)}
</AnimatedGroup>

// Fade in on scroll
<FadeInOnScroll direction="up" delay={0.1}>
  <Card />
</FadeInOnScroll>

// Animated Modal
<AnimatedModal isOpen={showModal} onClose={() => setShowModal(false)}>
  <ModalContent />
</AnimatedModal>

// Animated List with items
<AnimatedList>
  {items.map(item => (
    <AnimatedListItem key={item.id} onClick={() => handleClick(item)}>
      {item.content}
    </AnimatedListItem>
  ))}
</AnimatedList>

// Animated Counter
<AnimatedCounter 
  value={15000} 
  prefix="$" 
  format="currency" 
  duration={1.5} 
/>

// Animated Progress Bar
<AnimatedProgress value={75} color="bg-blue-500" showLabel />

*/
