'use client';

import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactFormSchema, ContactFormData } from '@/lib/validation';
import { AnimatedSection } from '../AnimatedSection';
import { Button } from '@/components/Button';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { FiSend, FiMail, FiGithub, FiCheck } from 'react-icons/fi';

interface ContactSectionProps {
  email: string;
  githubUrl: string;
}

export function ContactSection({ email, githubUrl }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const sectionRef = useRef<HTMLElement>(null);

  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);
  const springX = useSpring(glowX, { damping: 40, stiffness: 150, mass: 1 });
  const springY = useSpring(glowY, { damping: 40, stiffness: 150, mass: 1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) { setSubmitStatus('success'); reset(); }
      else setSubmitStatus('error');
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full px-4 py-3 bg-subtle/60 border border-border rounded-xl text-foreground
    placeholder:text-fg-tertiary focus:outline-none focus:border-primary/50
    transition-all duration-200 text-sm hover:border-primary/25
    focus:shadow-[0_0_0_4px_rgb(var(--primary)/0.12),0_0_24px_rgb(var(--primary)/0.15)]`;

  const githubHandle = githubUrl.replace(/^https?:\/\//, '');

  return (
    <section
      ref={sectionRef}
      id="contact"
      onMouseMove={handleMouseMove}
      className="py-32 md:py-40 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Cursor-follow ambient glow (desktop only, hidden on touch via pointer:coarse fallback) */}
      <motion.div
        className="pointer-events-none absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-0 md:opacity-100 hidden md:block"
        style={{
          background: 'radial-gradient(circle, rgb(var(--primary) / 0.14) 0%, transparent 70%)',
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />

      {/* Background mesh */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(ellipse 70% 50% at 50% 100%, rgb(var(--secondary)) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection animation="fadeIn">
          <div className="flex items-center gap-3 mb-8">
            <span className="section-num">06.</span>
            <div className="gradient-rule" />
          </div>
          <h2 className="font-display italic text-4xl sm:text-5xl md:text-6xl leading-[1.05] text-foreground mb-14 max-w-2xl">
            Let&apos;s build something worth shipping.
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 items-start">
          {/* Left — copy */}
          <AnimatedSection animation="slideIn" delay={0.1}>
            <div className="md:col-span-2">
              <p className="text-lg text-fg-secondary leading-relaxed mb-6">
                Have a project in mind or just want to say hello? I&apos;d love to hear from you.
              </p>
              <div className="space-y-3">
                <a
                  href={`mailto:${email}`}
                  data-cursor="hover"
                  className="flex items-center gap-3 text-sm text-fg-secondary hover:text-primary transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <FiMail className="w-3.5 h-3.5 text-primary" />
                  </span>
                  {email}
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="flex items-center gap-3 text-sm text-fg-secondary hover:text-primary transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-primary/8 border border-primary/15 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <FiGithub className="w-3.5 h-3.5 text-primary" />
                  </span>
                  {githubHandle}
                </a>
              </div>
            </div>
          </AnimatedSection>

          {/* Right — form */}
          <AnimatedSection animation="slideUp" delay={0.15}>
            <div className="md:col-span-3">
              <div className="glow-card p-6 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input {...register('name')} type="text" placeholder="Your name" className={inputClass} />
                      {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register('email')} type="email" placeholder="Your email" className={inputClass} />
                      {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div>
                    <input {...register('subject')} type="text" placeholder="Subject" className={inputClass} />
                    {errors.subject && <p className="mt-1.5 text-xs text-red-500">{errors.subject.message}</p>}
                  </div>
                  <div>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="Your message..."
                      className={`${inputClass} resize-none`}
                    />
                    {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>}
                  </div>

                  {submitStatus === 'success' && (
                    <div className="p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-xl text-sm text-center border border-emerald-500/20">
                      Message sent! I&apos;ll get back to you soon.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="p-3 bg-red-500/10 text-red-600 dark:text-red-400 rounded-xl text-sm text-center border border-red-500/20">
                      Something went wrong. Please email me directly.
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full gap-2">
                    <AnimatePresence mode="wait" initial={false}>
                      {submitStatus === 'success' ? (
                        <motion.span
                          key="sent"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                          className="flex items-center gap-2"
                        >
                          <FiCheck className="w-4 h-4" />
                          Sent
                        </motion.span>
                      ) : (
                        <motion.span
                          key="send"
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.6 }}
                          transition={{ duration: 0.25, ease: [0.19, 1, 0.22, 1] }}
                          className="flex items-center gap-2"
                        >
                          <FiSend className="w-4 h-4" />
                          {isSubmitting ? 'Sending...' : 'Send Message'}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </Button>
                </form>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
