/** Shared, mutable state read every frame by the 3D hero. Not React state on purpose.
 *  v = scroll progress 0..1, x/y = pointer -1..1,
 *  topEdge / bottomEdge = px (from the top of the sticky hero) of the bottom of the top text block and the top of the headline block. */
export const heroProgress = { v: 0, x: 0, y: 0, topEdge: 250, bottomEdge: 450, focus: -1, dive: 0 };
/** focus = index of the object the visitor chose (-1 none); dive = 0..1 progress of the fly-in transition. */
