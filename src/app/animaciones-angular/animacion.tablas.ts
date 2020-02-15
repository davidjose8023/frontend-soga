import {
    trigger,
    transition,
    style,
    animate,
    query,
    stagger,
    state,
    keyframes
  } from "@angular/animations";
    export const animacion = 
    [
      trigger("listAnimation", [
      transition("* => *", [
        // each time the binding value changes
        query(
          ":leave",
          //[stagger(100, [animate("0.5s", style({ opacity: 0 }))])],
          stagger(50, [
            animate('300ms ease-out', style({ opacity: 0, width: '0px' })),
          ]),
          { optional: true }
        ),
        query(
          ":enter",
          [
            style({ opacity: 0 }),
            //stagger(100, [animate("0.5s", style({ opacity: 1 }))])
            stagger(50, [
              animate('300ms ease-out', style({ opacity: 1, width: '*' })),
            ]),

          ],
          { optional: true }
        )
      ])
    ]),
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateY(0)', opacity: 1, 'overflow-y': 'hidden'}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    ),
    trigger('slideIn', [
      state('*', style({ 'overflow-x': 'hidden' })),
      state('void', style({ 'overflow-x': 'hidden' })),
      transition('* => void', [
        style({ height: '*' }),
        animate(250, style({ height: 0 }))
      ]),
      transition('void => *', [
        style({ height: '0' }),
        animate(250, style({ height: '*' }))
      ])
    ])]
  